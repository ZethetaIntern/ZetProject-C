import { ToastItem } from "./Toast";
const meta = {
  title: "UI/Toast",
  component: ToastItem,
  tags: ["autodocs"]
};
export default meta;
export const Success = {
  args: {
    toast: {
      id: "1",
      message: "Transaction completed successfully: Bought 1000 AAPL @ $172.45",
      type: "success"
    }
  }
};
export const Error = {
  args: {
    toast: {
      id: "2",
      message: "Transaction rejected: Limit price deviation too high",
      type: "error"
    }
  }
};
export const Warning = {
  args: {
    toast: {
      id: "3",
      message: "Real-time WebSocket disconnected. Reconnecting in 5s...",
      type: "warning"
    }
  }
};
export const Info = {
  args: {
    toast: {
      id: "4",
      message: "Portfolio parameters rebalanced. Cash balance updated.",
      type: "info"
    }
  }
};
