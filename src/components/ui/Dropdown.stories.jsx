import { Dropdown } from "./Dropdown";
import { useState } from "react";
const meta = {
  title: "UI/Dropdown",
  component: Dropdown,
  tags: ["autodocs"]
};
export default meta;
const options = [
  { value: "sp500", label: "S&P 500 Index", group: "Equities" },
  { value: "nasdaq", label: "Nasdaq 100 Index", group: "Equities" },
  { value: "ust10y", label: "US 10-Year Treasury", group: "Bonds" },
  { value: "ust2y", label: "US 2-Year Treasury", group: "Bonds" },
  { value: "gold", label: "Gold Spot", group: "Commodities" },
  { value: "oil", label: "Crude Oil", group: "Commodities" }
];
export const Single = {
  render: () => {
    const [val, setVal] = useState("sp500");
    return <Dropdown options={options} value={val} onChange={setVal} />;
  }
};
export const Multi = {
  render: () => {
    const [val, setVal] = useState(["sp500", "ust10y"]);
    return <Dropdown options={options} value={val} onChange={setVal} isMulti />;
  }
};
export const Searchable = {
  render: () => {
    const [val, setVal] = useState("gold");
    return <Dropdown options={options} value={val} onChange={setVal} isSearchable placeholder="Search assets..." />;
  }
};
