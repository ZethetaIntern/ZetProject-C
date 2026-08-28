import { useEffect, useState } from "react";
import mockDataService from "../services/mockDataService";
import Tooltip from "../components/ui/Tooltip";
export const RiskMetricsWidget = () => {
  const [metrics, setMetrics] = useState(null);
  useEffect(() => {
    const unsubscribe = mockDataService.subscribeRiskMetrics((data) => {
      setMetrics(data);
    });
    return unsubscribe;
  }, []);
  if (!metrics) return <div className="shimmer-bg h-full w-full rounded" />;
  const items = [
    {
      name: "Sharpe Ratio",
      value: metrics.sharpeRatio.toFixed(2),
      formula: "Sharpe = (Rp - Rf) / σp",
      desc: "Risk-adjusted return compared to risk-free rate, divided by total standard deviation."
    },
    {
      name: "Sortino Ratio",
      value: metrics.sortinoRatio.toFixed(2),
      formula: "Sortino = (Rp - Rf) / σd",
      desc: "Risk-adjusted return focusing only on negative downside deviation."
    },
    {
      name: "Treynor Ratio",
      value: (metrics.treynorRatio * 100).toFixed(2) + "%",
      formula: "Treynor = (Rp - Rf) / βp",
      desc: "Adjusted return per unit of systematic risk (Beta)."
    },
    {
      name: "Jensen Alpha",
      value: (metrics.alpha >= 0 ? "+" : "") + metrics.alpha.toFixed(2) + "%",
      formula: "Alpha = Rp - [Rf + βp(Rm - Rf)]",
      desc: "Excess return generated relative to benchmark CAPM expected return."
    },
    {
      name: "Portfolio Beta",
      value: metrics.beta.toFixed(3),
      formula: "Beta = Cov(Rp, Rm) / Var(Rm)",
      desc: "Sensitivity of portfolio returns relative to benchmark market movements."
    },
    {
      name: "Information Ratio",
      value: metrics.informationRatio.toFixed(2),
      formula: "IR = (Rp - Rb) / Tracking Error",
      desc: "Consistency of active returns over tracking error against index."
    }
  ];
  return <div className="flex flex-col h-full gap-2 text-xs">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2 select-none">
        <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[10px]">
          Portfolio Risk Analytics Ratios
        </span>
        <span className="text-[9px] text-[var(--text-secondary)]">Ex-Ante Estimates</span>
      </div>

      <div className="flex-grow grid grid-cols-2 gap-2 mt-2">
        {items.map((item) => <Tooltip
    key={item.name}
    position="top"
    className="w-full"
    content={<div className="flex flex-col gap-1 p-1 max-w-[200px] text-xs">
                <span className="font-bold border-b border-gray-600 pb-0.5">{item.formula}</span>
                <span className="font-light text-[10px] whitespace-normal leading-normal">{item.desc}</span>
              </div>}
  >
            <div className="p-2.5 bg-[var(--bg-dashboard)]/60 hover:bg-[var(--bg-dashboard)] rounded border border-[var(--border-color)] flex flex-col justify-center transition-colors">
              <span className="text-[var(--text-muted)] text-[9px] uppercase tracking-wider select-none">
                {item.name}
              </span>
              <span className="text-sm font-bold text-[var(--text-primary)] mono-font mt-1">
                {item.value}
              </span>
            </div>
          </Tooltip>)}
      </div>
    </div>;
};
export default RiskMetricsWidget;
