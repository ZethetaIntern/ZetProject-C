import React, { useEffect, useState } from "react";
import { useDashboardStore } from "./store/dashboardStore";
import mockDataService from "./services/mockDataService";
import GridManager from "./components/GridManager";
import Button from "./components/ui/Button";
import Dropdown from "./components/ui/Dropdown";
import { ToastContainer } from "./components/ui/Toast";
import ErrorBoundaryUI from "./components/ui/ErrorBoundaryUI";
class GlobalErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("System crash captured:", error, errorInfo);
  }
  handleReload = () => {
    window.location.reload();
  };
  render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorBoundaryUI error={this.state.error} resetError={this.handleReload} variant="page" />;
    }
    return this.props.children;
  }
}
const HeaderClock = () => {
  const [time, setTime] = useState(/* @__PURE__ */ new Date());
  useEffect(() => {
    const clockId = setInterval(() => setTime(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(clockId);
  }, []);
  return <div className="hidden lg:flex flex-col text-right">
      <span className="text-[10px] font-bold text-[var(--text-primary)] mono-font select-none">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </span>
      <span className="text-[8px] text-[var(--text-muted)] uppercase font-semibold select-none">
        {time.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
      </span>
    </div>;
};
const SessionWarningBanner = () => {
  const user = useDashboardStore((state) => state.user);
  const sessionTimeLeft = useDashboardStore((state) => state.sessionTimeLeft);
  const showSessionWarning = useDashboardStore((state) => state.showSessionWarning);
  const formatSessionTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  if (!showSessionWarning || !user) return null;
  return <div className="w-full bg-[var(--color-down-bg)] border-b border-[var(--color-down)] text-[var(--color-down)] text-[11px] font-bold px-4 py-1.5 flex items-center justify-between z-[1000] select-none">
      <div className="flex items-center gap-2">
        <svg style={{ width: "14px", height: "14px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>SECURITY NOTICE: Session expiring in {formatSessionTime(sessionTimeLeft)}. Re-login required soon.</span>
      </div>
    </div>;
};
export const AppContent = () => {
  const isEditing = useDashboardStore((state) => state.isEditing);
  const theme = useDashboardStore((state) => state.theme);
  const user = useDashboardStore((state) => state.user);
  const login = useDashboardStore((state) => state.login);
  const logout = useDashboardStore((state) => state.logout);
  const setTheme = useDashboardStore((state) => state.setTheme);
  const setEditing = useDashboardStore((state) => state.setEditing);
  const resetLayout = useDashboardStore((state) => state.resetLayout);
  const addWidget = useDashboardStore((state) => state.addWidget);
  const addToast = useDashboardStore((state) => state.addToast);
  const tickSession = useDashboardStore((state) => state.tickSession);
  const [wsConnected, setWsConnected] = useState(true);
  const [usernameInput, setUsernameInput] = useState("m_tayade");
  const [roleInput, setRoleInput] = useState("Portfolio Manager");
  const [activeTab, setActiveTab] = useState("dashboard");
  useEffect(() => {
    const sessionId = setInterval(() => tickSession(), 1e3);
    const unsubscribeWS = mockDataService.subscribeConnectionState((connected) => {
      setWsConnected(connected);
    });
    return () => {
      clearInterval(sessionId);
      unsubscribeWS();
    };
  }, [tickSession]);
  const toggleConnection = () => {
    const nextState = !wsConnected;
    mockDataService.setConnectionState(nextState);
    addToast(
      nextState ? "WebSocket server reconnected" : "Real-time WebSocket disconnected, falling back to polling",
      nextState ? "success" : "warning"
    );
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    login(usernameInput, roleInput);
  };
  const widgetOptions = [
    { value: "portfolio-summary", label: "Portfolio Summary", group: "Analytics" },
    { value: "nav-performance", label: "NAV Performance Chart", group: "Analytics" },
    { value: "var-gauges", label: "Value at Risk Gauges", group: "Risk Engine" },
    { value: "drawdown-analysis", label: "Drawdown Series", group: "Risk Engine" },
    { value: "correlation-matrix", label: "Correlation Matrix Heatmap", group: "Risk Engine" },
    { value: "brinson-attribution", label: "Attribution Analysis", group: "Performance" },
    { value: "yield-curve", label: "Yield Curve Yields", group: "Performance" },
    { value: "risk-metrics", label: "Risk Analytics Grid", group: "Analytics" },
    { value: "sector-allocation", label: "Sector Allocation Weights", group: "Analytics" },
    { value: "transaction-log", label: "Streaming Order Ticker", group: "Feeds" }
  ];
  const handleAddWidgetSelect = (type) => {
    if (!type) return;
    addWidget(type);
  };
  return <div className="flex flex-col h-screen select-none" style={{ backgroundColor: "var(--bg-dashboard)", color: "var(--text-primary)" }}>
      {
    /* Top Banner Alert (WS Offline warning) */
  }
      {!wsConnected && <div className="w-full bg-[var(--color-warning-bg)] border-b border-[var(--color-warning)] text-[var(--color-warning)] text-[11px] font-bold px-4 py-1.5 flex items-center justify-between z-[1000] select-none">
          <div className="flex items-center gap-2">
            <svg style={{ width: "14px", height: "14px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>CRITICAL WARNING: Live feeds disconnected. Falling back to HTTP Polling interval of 8s.</span>
          </div>
          <button
    onClick={toggleConnection}
    className="px-2 py-0.5 rounded bg-[var(--color-warning)] text-black text-[10px] font-bold border-none cursor-pointer"
  >
            Reconnect
          </button>
        </div>}

      {
    /* Session warning banner */
  }
      <SessionWarningBanner />

      {
    /* Header */
  }
      <header className="h-14 bg-[var(--bg-header)] border-b border-[var(--border-color)] flex items-center justify-between px-6 z-40 select-none">
        <div className="flex items-center gap-3">
          <svg style={{ width: "22px", height: "22px", color: "var(--accent-color)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div>
            <h1 className="text-sm font-bold tracking-tight uppercase select-none text-[var(--text-primary)]">
              Meridian Capital
            </h1>
            <span className="text-[9px] text-[var(--text-muted)] tracking-wider font-semibold uppercase block -mt-1 select-none">
              Institutional Asset Analytics Portfolio (USD 45B AUM)
            </span>
          </div>
        </div>

        {
    /* Search bar command simulator */
  }
        <div className="hidden md:flex max-w-sm flex-grow mx-8 select-none">
          <div className="relative w-full">
            <input
    type="text"
    readOnly
    placeholder="F1 for command terminal..."
    className="w-full px-3 py-1.5 text-xs bg-[var(--bg-dashboard)] border border-[var(--border-color)] rounded text-[var(--text-muted)] cursor-not-allowed"
  />
            <span className="absolute right-2.5 top-1.5 bg-[var(--scrollbar-thumb)] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[var(--border-color)] text-[var(--text-secondary)]">F1</span>
          </div>
        </div>

        {
    /* Global Controls & Theme */
  }
        <div className="flex items-center gap-4">
          {
    /* Live Date Time */
  }
          <HeaderClock />

          {
    /* Connection state */
  }
          <button
    onClick={toggleConnection}
    className="flex items-center justify-center p-1.5 rounded hover:bg-[var(--bg-dashboard)] border border-[var(--border-color)] bg-transparent cursor-pointer"
    title={wsConnected ? "WebSocket live. Click to disconnect." : "WebSocket disconnected. Click to reconnect."}
  >
            {wsConnected ? <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-up)]" /> : <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-down)] animate-pulse" />}
          </button>

          {
    /* Theme Selector */
  }
          <div className="flex items-center bg-[var(--bg-dashboard)] p-0.5 rounded border border-[var(--border-color)]">
            {["light", "dark", "high-contrast"].map((t) => <button
    key={t}
    onClick={() => setTheme(t)}
    className="px-2 py-0.5 rounded text-[9px] font-bold capitalize transition-colors"
    style={{
      backgroundColor: theme === t ? "var(--bg-card)" : "transparent",
      color: theme === t ? "var(--accent-color)" : "var(--text-secondary)",
      border: "none",
      cursor: "pointer"
    }}
  >
                {t}
              </button>)}
          </div>

          {
    /* Auth Display / Actions */
  }
          {user ? <div className="flex items-center gap-3">
              <div className="flex flex-col text-right select-none">
                <span className="text-xs font-semibold text-[var(--text-primary)] mono-font">{user.username}</span>
                <span className="text-[9px] text-[var(--text-muted)] font-semibold uppercase">{user.role}</span>
              </div>
              <Button variant="danger" size="sm" onClick={logout}>
                Exit
              </Button>
            </div> : <form onSubmit={handleLoginSubmit} className="flex items-center gap-2">
              <input
    type="text"
    placeholder="User ID"
    value={usernameInput}
    onChange={(e) => setUsernameInput(e.target.value)}
    className="px-2 py-1 text-xs bg-[var(--bg-dashboard)] border border-[var(--border-color)] rounded w-20 text-[var(--text-primary)] focus:outline-none"
    required
  />
              <select
    value={roleInput}
    onChange={(e) => setRoleInput(e.target.value)}
    className="px-2 py-1 text-xs bg-[var(--bg-dashboard)] border border-[var(--border-color)] rounded text-[var(--text-secondary)] focus:outline-none"
  >
                <option value="Portfolio Manager">Manager</option>
                <option value="Viewer">Viewer</option>
              </select>
              <Button variant="primary" size="sm" type="submit">
                Login
              </Button>
            </form>}
        </div>
      </header>

      {
    /* Main Body */
  }
      <div className="flex flex-1 overflow-hidden">
        {
    /* Sidebar */
  }
        <aside className="w-14 md:w-48 bg-[var(--bg-sidebar)] text-white flex flex-col z-30 select-none">
          <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
            {[
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "attribution", label: "Attribution", icon: "⚖️" },
    { id: "yield", label: "Yield Curve", icon: "📈" }
  ].map((navItem) => {
    const active = activeTab === navItem.id;
    return <button
      key={navItem.id}
      onClick={() => setActiveTab(navItem.id)}
      className={`w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2 rounded text-xs font-semibold transition-colors cursor-pointer text-left ${active ? "bg-[var(--accent-color)] text-white" : "text-slate-400 hover:bg-slate-800"}`}
      style={{ border: "none", background: "none" }}
    >
                  <span className="text-sm">{navItem.icon}</span>
                  <span className="hidden md:inline">{navItem.label}</span>
                </button>;
  })}
          </nav>
          
          {
    /* Footer Info */
  }
          <div className="p-3 border-t border-slate-800 text-[9px] text-slate-400 hidden md:block select-none">
            <span>Terminal ID: <strong className="font-mono text-slate-300">MC-AUM45B</strong></span>
          </div>
        </aside>

        {
    /* Dashboard Content Container */
  }
        <main className="flex-1 flex flex-col p-6 overflow-hidden">
          {
    /* Widget Grid Control bar */
  }
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 select-none">
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                Meridian Portfolio Dashboard
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Active widgets running layout schema <strong>v1.0.4</strong>. Locked at 60 FPS refresh rates.
              </p>
            </div>

            {
    /* Editing actions - portfolio managers only */
  }
            {user?.role === "Portfolio Manager" && <div className="flex items-center gap-3">
                {
    /* Add Widget dropdown select */
  }
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">Add Analytic:</span>
                  <Dropdown
    options={widgetOptions}
    value=""
    onChange={handleAddWidgetSelect}
    placeholder="Choose Widget..."
    isSearchable
  />
                </div>

                <div className="h-6 w-px bg-[var(--border-color)]" />

                <div className="flex items-center gap-1.5">
                  <Button
    variant={isEditing ? "primary" : "secondary"}
    size="sm"
    onClick={() => setEditing(!isEditing)}
  >
                    {isEditing ? "Save Layout" : "Edit Layout"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={resetLayout}>
                    Reset Default
                  </Button>
                </div>
              </div>}
          </div>

          {
    /* Grid Area wrapper */
  }
          <div className="flex-grow overflow-hidden">
            <GridManager />
          </div>
        </main>
      </div>

      {
    /* Notifications Toast */
  }
      <ToastContainer />
    </div>;
};
export const App = () => {
  return <GlobalErrorBoundary>
      <AppContent />
    </GlobalErrorBoundary>;
};
export default App;
