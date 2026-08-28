import { Tooltip } from "./Tooltip";
const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"]
};
export default meta;
export const Top = {
  args: {
    content: "Tooltip text content",
    position: "top",
    children: <button className="px-4 py-2 border rounded border-[var(--border-color)]">Hover Top</button>
  }
};
export const Bottom = {
  args: {
    content: "Tooltip text content",
    position: "bottom",
    children: <button className="px-4 py-2 border rounded border-[var(--border-color)]">Hover Bottom</button>
  }
};
export const Left = {
  args: {
    content: "Tooltip text content",
    position: "left",
    children: <button className="px-4 py-2 border rounded border-[var(--border-color)]">Hover Left</button>
  }
};
export const Right = {
  args: {
    content: "Tooltip text content",
    position: "right",
    children: <button className="px-4 py-2 border rounded border-[var(--border-color)]">Hover Right</button>
  }
};
