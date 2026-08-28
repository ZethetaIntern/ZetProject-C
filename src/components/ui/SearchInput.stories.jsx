import { SearchInput } from "./SearchInput";
import { useState } from "react";
const meta = {
  title: "UI/SearchInput",
  component: SearchInput,
  tags: ["autodocs"]
};
export default meta;
export const Default = {
  render: () => {
    const [val, setVal] = useState("");
    return <SearchInput value={val} onChange={setVal} placeholder="Search tickers..." />;
  }
};
export const WithSuggestions = {
  render: () => {
    const [val, setVal] = useState("");
    const list = ["AAPL", "AMZN", "MSFT", "UST10Y", "BTCUSD", "EURUSD"];
    return <SearchInput
      value={val}
      onChange={setVal}
      suggestions={list}
      placeholder="Type a ticker (e.g. A)..."
    />;
  }
};
