import { useState, useMemo } from "react";
import Button from "./Button";
export function DataTable({
  columns,
  data,
  searchKey,
  searchValue = "",
  pageSize = 10,
  className = ""
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };
  const filteredData = useMemo(() => {
    if (!searchKey || !searchValue) return data;
    return data.filter((row) => {
      const val = row[searchKey];
      if (val === void 0 || val === null) return false;
      return String(val).toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [data, searchKey, searchValue]);
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortKey, sortDirection]);
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);
  return <div className={`flex flex-col gap-3 h-full overflow-hidden ${className}`}>
      <div className="flex-grow overflow-auto border border-[var(--border-color)] rounded-md">
        <table className="w-full text-left border-collapse text-xs select-text">
          <thead className="sticky top-0 bg-[var(--bg-dashboard)] border-b border-[var(--border-color)] text-[var(--text-secondary)] font-semibold uppercase tracking-wider z-10">
            <tr>
              {columns.map((col) => <th
    key={String(col.key)}
    onClick={() => col.sortable && handleSort(String(col.key))}
    className={`px-4 py-2.5 ${col.sortable ? "cursor-pointer hover:bg-[var(--border-color)]/30" : ""}`}
  >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && sortKey === String(col.key) && <span className="text-[var(--accent-color)]">
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>}
                  </div>
                </th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-primary)]">
            {paginatedData.map((row, idx) => <tr key={idx} className="hover:bg-[var(--bg-dashboard)]/30 transition-colors">
                {columns.map((col) => <td key={String(col.key)} className="px-4 py-2 text-[var(--text-primary)]">
                    {col.render ? col.render(row) : row[String(col.key)]}
                  </td>)}
              </tr>)}
            {paginatedData.length === 0 && <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-[var(--text-muted)]">
                  No records to display
                </td>
              </tr>}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && <div className="flex items-center justify-between px-2 pt-2 border-t border-[var(--border-color)]">
          <span className="text-xs text-[var(--text-secondary)] select-none">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} records
          </span>
          <div className="flex items-center gap-1">
            <Button
    variant="secondary"
    size="sm"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
  >
              Prev
            </Button>
            <span className="text-xs font-semibold px-2 select-none">
              {currentPage} / {totalPages}
            </span>
            <Button
    variant="secondary"
    size="sm"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
  >
              Next
            </Button>
          </div>
        </div>}
    </div>;
}
export default DataTable;
