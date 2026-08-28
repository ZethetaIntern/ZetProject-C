import { DataTable } from "./DataTable";
const meta = {
  title: "UI/DataTable",
  component: DataTable,
  tags: ["autodocs"]
};
export default meta;
const columns = [
  { key: "symbol", header: "Symbol", sortable: true },
  { key: "company", header: "Company", sortable: true },
  { key: "price", header: "Price ($)", sortable: true, render: (row) => <strong>${row.price}</strong> },
  { key: "change", header: "Change", sortable: true, render: (row) => <span style={{ color: row.change >= 0 ? "var(--color-up)" : "var(--color-down)" }}>{row.change}%</span> }
];
const mockData = [
  { symbol: "AAPL", company: "Apple Inc.", price: 172.45, change: 1.25 },
  { symbol: "MSFT", company: "Microsoft Corp.", price: 415.6, change: -0.42 },
  { symbol: "NVDA", company: "Nvidia Corp.", price: 875.12, change: 4.82 },
  { symbol: "AMZN", company: "Amazon.com Inc.", price: 178.15, change: 0.12 },
  { symbol: "GOOGL", company: "Alphabet Inc.", price: 151.6, change: -1.05 }
];
export const Default = {
  args: {
    columns,
    data: mockData,
    pageSize: 3
  }
};
