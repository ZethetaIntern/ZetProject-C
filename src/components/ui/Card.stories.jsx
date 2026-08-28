import { Card } from "./Card";
const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    isCollapsed: { control: "boolean" },
    showBorder: { control: "boolean" }
  }
};
export default meta;
export const Default = {
  args: {
    title: "Card Title",
    children: <div style={{ minHeight: "100px" }}>This is the default card body content.</div>,
    footer: "This is the card footer slot."
  }
};
export const Collapsed = {
  args: {
    title: "Collapsed Card",
    isCollapsed: true,
    children: <div>This body should be hidden.</div>
  }
};
export const Loading = {
  args: {
    title: "Loading Card Data",
    children: <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ height: "14px", backgroundColor: "var(--scrollbar-thumb)", width: "80%", borderRadius: "4px" }} className="shimmer-bg" />
        <div style={{ height: "14px", backgroundColor: "var(--scrollbar-thumb)", width: "60%", borderRadius: "4px" }} className="shimmer-bg" />
        <div style={{ height: "14px", backgroundColor: "var(--scrollbar-thumb)", width: "90%", borderRadius: "4px" }} className="shimmer-bg" />
      </div>
  }
};
