import { ErrorBoundaryUI } from "./ErrorBoundaryUI";
const meta = {
  title: "UI/ErrorBoundaryUI",
  component: ErrorBoundaryUI,
  tags: ["autodocs"]
};
export default meta;
const mockError = new Error("Database connection failed: ETIMEDOUT at socket (net.js:847)");
export const WidgetError = {
  args: {
    error: mockError,
    resetError: () => alert("Widget reset!"),
    variant: "widget"
  }
};
export const PageError = {
  args: {
    error: mockError,
    resetError: () => alert("Reload page!"),
    variant: "page"
  }
};
export const NetworkError = {
  args: {
    error: new Error("WebSocket connection closed cleanly by remote peer."),
    resetError: () => alert("Reconnect!"),
    variant: "network"
  }
};
