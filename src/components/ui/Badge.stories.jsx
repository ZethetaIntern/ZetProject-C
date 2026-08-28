import { Badge } from "./Badge";
const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"]
};
export default meta;
export const Success = {
  args: {
    children: "Active Trade",
    variant: "success"
  }
};
export const Danger = {
  args: {
    children: "High VaR Limit",
    variant: "danger"
  }
};
export const Warning = {
  args: {
    children: "Stale Data Feed",
    variant: "warning"
  }
};
export const Info = {
  args: {
    children: "Real-time Subscribed",
    variant: "info"
  }
};
export const Removable = {
  args: {
    children: "Removable Asset Filter",
    variant: "neutral",
    onRemove: () => alert("Removed!")
  }
};
