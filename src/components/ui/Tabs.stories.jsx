import { Tabs } from "./Tabs";
import { useState } from "react";
const meta = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"]
};
export default meta;
const items = [
  { id: "all", label: "All Hold" },
  { id: "eq", label: "Equities Only" },
  { id: "fi", label: "Fixed Income Only" }
];
export const Default = {
  render: () => {
    const [active, setActive] = useState("all");
    return <Tabs items={items} activeId={active} onChange={setActive} />;
  }
};
