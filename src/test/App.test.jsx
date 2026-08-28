import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { useDashboardStore } from "../store/dashboardStore";
vi.mock("recharts", () => {
  return {
    ResponsiveContainer: ({ children }) => <div className="mock-container">{children}</div>,
    AreaChart: ({ children }) => <div data-testid="area-chart">{children}</div>,
    Area: () => <div data-testid="area" />,
    BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
    Bar: () => <div data-testid="bar" />,
    LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
    Line: () => <div data-testid="line" />,
    XAxis: () => null,
    YAxis: () => null,
    CartesianGrid: () => null,
    Tooltip: () => null,
    Legend: () => null
  };
});
describe("Main Application Layout Shell", () => {
  it("should render and handle core layout interactions", async () => {
    render(<App />);
    expect(screen.getByText("Meridian Capital")).toBeInTheDocument();
    const connBtn = screen.getByTitle(/WebSocket live/i);
    expect(connBtn).toBeInTheDocument();
    fireEvent.click(connBtn);
    expect(screen.getByText(/CRITICAL WARNING: Live feeds disconnected/i)).toBeInTheDocument();
    const reconnectBtn = screen.getByRole("button", { name: "Reconnect" });
    fireEvent.click(reconnectBtn);
    const lightThemeBtn = screen.getByRole("button", { name: "light" });
    fireEvent.click(lightThemeBtn);
    expect(useDashboardStore.getState().theme).toBe("light");
    const darkThemeBtn = screen.getByRole("button", { name: "dark" });
    fireEvent.click(darkThemeBtn);
    expect(useDashboardStore.getState().theme).toBe("dark");
    const nameInput = screen.getByPlaceholderText("User ID");
    fireEvent.change(nameInput, { target: { value: "pm_tester" } });
    const roleSelect = screen.getByRole("combobox");
    fireEvent.change(roleSelect, { target: { value: "Portfolio Manager" } });
    const loginBtn = screen.getByRole("button", { name: "Login" });
    fireEvent.submit(loginBtn.closest("form"));
    expect(screen.getByText("pm_tester")).toBeInTheDocument();
    expect(screen.getByText("Portfolio Manager")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit Layout" })).toBeInTheDocument();
    const exitBtn = screen.getByRole("button", { name: "Exit" });
    fireEvent.click(exitBtn);
    expect(screen.queryByText("pm_tester")).not.toBeInTheDocument();
  });
});
