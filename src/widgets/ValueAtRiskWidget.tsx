import React, { useEffect, useState } from 'react';
import mockDataService, { RiskMetrics } from '../services/mockDataService';

interface GaugeProps {
  label: string;
  value: number;
  max: number;
  suffix?: string;
}

const CircularGauge: React.FC<GaugeProps> = ({ label, value, max, suffix = '%' }) => {
  const radius = 32;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  // Map value to arc percentage
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Visual Alert Level Colors
  let color = 'var(--color-up)'; // Green
  if (value > 4.5) {
    color = 'var(--color-down)'; // Red
  } else if (value > 2.5) {
    color = 'var(--color-warning)'; // Amber
  }

  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full transform -rotate-95">
          {/* Background track circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="var(--chart-grid)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Foreground active indicator circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        {/* Core text output */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-xs font-bold text-[var(--text-primary)] mono-font">
            {value.toFixed(2)}{suffix}
          </span>
        </div>
      </div>
      <span className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase text-center">
        {label}
      </span>
    </div>
  );
};

export const ValueAtRiskWidget: React.FC = () => {
  const [metrics, setMetrics] = useState<RiskMetrics | null>(null);

  useEffect(() => {
    const unsubscribe = mockDataService.subscribeRiskMetrics((data) => {
      setMetrics(data);
    });
    return unsubscribe;
  }, []);

  if (!metrics) return <div className="shimmer-bg h-full w-full rounded" />;

  // Derive stable VaR estimates from mock metrics
  const parametricVaR = metrics.sharpeRatio;
  const historicalVaR = metrics.sortinoRatio;
  const monteCarloVaR = Math.abs(metrics.maxDrawdown * 0.35); // simulated active Monte Carlo VaR

  return (
    <div className="flex flex-col justify-between h-full gap-2">
      <div className="flex items-center justify-between select-none">
        <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[10px]">
          Value at Risk (99% 1-Day Horizon)
        </span>
        <span className="text-[9px] font-semibold text-[var(--text-secondary)]">
          Limit Target: &lt;4.5%
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 py-2">
        <CircularGauge label="Parametric" value={parametricVaR} max={6} />
        <CircularGauge label="Historical" value={historicalVaR} max={6} />
        <CircularGauge label="Monte Carlo" value={monteCarloVaR} max={6} />
      </div>

      <div className="text-[9px] text-[var(--text-muted)] border-t border-[var(--border-color)] pt-2 select-none">
        Risk Model: <strong className="text-[var(--text-secondary)]">Variance-Covariance Engine v2.4</strong>
      </div>
    </div>
  );
};

export default ValueAtRiskWidget;
