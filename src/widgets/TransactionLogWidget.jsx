import { useEffect, useState, useMemo } from "react";
import mockDataService from "../services/mockDataService";
import SearchInput from "../components/ui/SearchInput";
import DataTable from "../components/ui/DataTable";
import Badge from "../components/ui/Badge";
export const TransactionLogWidget = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  useEffect(() => {
    const hist = mockDataService.getTransactions();
    setTransactions(hist);
    const unsubscribe = mockDataService.subscribeTransactions((tx) => {
      setTransactions((prev) => [tx, ...prev]);
      setLastUpdated(Date.now());
    });
    return unsubscribe;
  }, []);
  const columns = useMemo(
    () => [
      {
        key: "timestamp",
        header: "Time",
        sortable: true,
        render: (row) => {
          const d = new Date(row.timestamp);
          return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        }
      },
      {
        key: "symbol",
        header: "Ticker",
        sortable: true,
        render: (row) => <span className="font-bold tracking-wide mono-font">{row.symbol}</span>
      },
      {
        key: "side",
        header: "Side",
        sortable: true,
        render: (row) => <span
          className={`font-bold text-[10px] ${row.side === "BUY" ? "text-[var(--color-up)]" : "text-[var(--color-down)]"}`}
        >
            {row.side}
          </span>
      },
      {
        key: "qty",
        header: "Size",
        sortable: true,
        render: (row) => <span className="mono-font">{row.qty.toLocaleString()}</span>
      },
      {
        key: "price",
        header: "Price",
        sortable: true,
        render: (row) => <span className="mono-font">${row.price.toFixed(2)}</span>
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        render: (row) => <Badge variant={row.status === "COMPLETED" ? "success" : "danger"}>
            {row.status}
          </Badge>
      }
    ],
    []
  );
  return <div className="flex flex-col h-full gap-2 text-xs overflow-hidden">
      {
    /* Search Header */
  }
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2 select-none">
        <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[10px]">
          Live Stream Transaction Log
        </span>
        <SearchInput
    value={searchValue}
    onChange={setSearchValue}
    placeholder="Filter Symbol..."
    className="max-w-[140px]"
  />
      </div>

      {
    /* Table */
  }
      <div className="flex-grow overflow-hidden mt-1">
        <DataTable
    columns={columns}
    data={transactions}
    searchKey="symbol"
    searchValue={searchValue}
    pageSize={4}
  />
      </div>
    </div>;
};
export default TransactionLogWidget;
