import React from "react";
export const widgetRegistry = {
  "portfolio-summary": {
    type: "portfolio-summary",
    name: "Portfolio Summary",
    description: "Overview of AUM, cash reserves, allocation summaries, and asset status.",
    defaultWidth: 6,
    defaultHeight: 4,
    component: React.lazy(() => import("../widgets/PortfolioSummaryWidget"))
  },
  "nav-performance": {
    type: "nav-performance",
    name: "NAV Performance",
    description: "Net Asset Value history line chart with multi-period zoom filters.",
    defaultWidth: 6,
    defaultHeight: 4,
    component: React.lazy(() => import("../widgets/NAVPerformanceWidget"))
  },
  "var-gauges": {
    type: "var-gauges",
    name: "Value at Risk (VaR)",
    description: "Monte Carlo, Parametric, and Historical VaR gauge status indicators.",
    defaultWidth: 4,
    defaultHeight: 3,
    component: React.lazy(() => import("../widgets/ValueAtRiskWidget"))
  },
  "drawdown-analysis": {
    type: "drawdown-analysis",
    name: "Drawdown Analysis",
    description: "Maximum drawdown and peak-to-trough duration time series metrics.",
    defaultWidth: 4,
    defaultHeight: 3,
    component: React.lazy(() => import("../widgets/DrawdownWidget"))
  },
  "correlation-matrix": {
    type: "correlation-matrix",
    name: "Correlation Matrix",
    description: "Heat-map grid of cross-asset class correlation coefficients.",
    defaultWidth: 4,
    defaultHeight: 3,
    component: React.lazy(() => import("../widgets/CorrelationMatrixWidget"))
  },
  "brinson-attribution": {
    type: "brinson-attribution",
    name: "Performance Attribution",
    description: "Brinson sector allocation, security selection, and interaction attribution.",
    defaultWidth: 6,
    defaultHeight: 4,
    component: React.lazy(() => import("../widgets/BrinsonAttributionWidget"))
  },
  "yield-curve": {
    type: "yield-curve",
    name: "Yield Curve",
    description: "Fixed-income yield curves comparing US Treasuries against Meridian holdings.",
    defaultWidth: 6,
    defaultHeight: 4,
    component: React.lazy(() => import("../widgets/YieldCurveWidget"))
  },
  "risk-metrics": {
    type: "risk-metrics",
    name: "Risk Metrics Grid",
    description: "Tabular view of ratios (Sharpe, Sortino, Alpha, Beta) with math tooltip overlays.",
    defaultWidth: 4,
    defaultHeight: 3,
    component: React.lazy(() => import("../widgets/RiskMetricsWidget"))
  },
  "sector-allocation": {
    type: "sector-allocation",
    name: "Sector Allocation",
    description: "Donut chart comparing active weights to benchmark targets.",
    defaultWidth: 4,
    defaultHeight: 3,
    component: React.lazy(() => import("../widgets/SectorAllocationWidget"))
  },
  "transaction-log": {
    type: "transaction-log",
    name: "Live Ticker Feed",
    description: "Real-time WS-driven transaction tick list with order controls.",
    defaultWidth: 4,
    defaultHeight: 3,
    component: React.lazy(() => import("../widgets/TransactionLogWidget"))
  }
};
export const getWidget = (type) => {
  return widgetRegistry[type];
};
export const listWidgets = () => {
  return Object.values(widgetRegistry);
};
export default widgetRegistry;
