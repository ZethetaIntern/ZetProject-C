import { Component } from "react";
import Card from "./ui/Card";
import ErrorBoundaryUI from "./ui/ErrorBoundaryUI";
import Badge from "./ui/Badge";
import { useDashboardStore } from "../store/dashboardStore";
class WidgetErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Widget error captured:", error, errorInfo);
  }
  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };
  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error, this.handleReset);
    }
    return this.props.children;
  }
}
export const WidgetShell = ({
  id,
  type,
  title,
  children,
  lastUpdated,
  isCollapsed = false
}) => {
  const user = useDashboardStore((state) => state.user);
  const removeWidget = useDashboardStore((state) => state.removeWidget);
  const toggleWidgetCollapse = useDashboardStore((state) => state.toggleWidgetCollapse);
  const isStale = lastUpdated ? Date.now() - lastUpdated > 6e3 : false;
  const headerActions = <div className="flex items-center gap-1.5 pointer-events-auto">
      {
    /* Staleness Indicators */
  }
      {lastUpdated && <Badge variant={isStale ? "warning" : "success"} className={isStale ? "stale-pulse" : ""}>
          {isStale ? "Stale" : "Live"}
        </Badge>}

      {
    /* Delete button (Portfolio Manager only) */
  }
      {user?.role === "Portfolio Manager" && <button
    type="button"
    onClick={() => removeWidget(id)}
    className="text-[var(--text-muted)] hover:text-[var(--color-down)] focus:outline-none flex items-center justify-center p-0.5 hover:bg-[var(--bg-dashboard)] rounded"
    style={{ background: "none", border: "none", cursor: "pointer" }}
    aria-label="Remove Widget"
  >
          <svg style={{ width: "12px", height: "12px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>}
    </div>;
  return <WidgetErrorBoundary
    fallback={(err, reset) => <Card title={title} showBorder={true}>
          <ErrorBoundaryUI error={err} resetError={reset} variant="widget" />
        </Card>}
  >
      <Card
    title={title}
    headerActions={headerActions}
    isCollapsed={isCollapsed}
    onToggleCollapse={() => toggleWidgetCollapse(id)}
    className="h-full w-full"
  >
        {children}
      </Card>
    </WidgetErrorBoundary>;
};
export default WidgetShell;
