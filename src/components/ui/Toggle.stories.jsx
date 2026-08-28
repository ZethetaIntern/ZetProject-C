import { Toggle } from "./Toggle";
import { useState } from "react";
const meta = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"]
};
export default meta;
export const Default = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Toggle checked={checked} onChange={setChecked} label="Toggle Setting Option" />;
  }
};
export const Disabled = {
  args: {
    checked: true,
    disabled: true,
    label: "Disabled State Toggle",
    onChange: () => {
    }
  }
};
