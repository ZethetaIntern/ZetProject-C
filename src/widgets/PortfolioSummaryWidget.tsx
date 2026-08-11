import React, { useEffect, useState } from 'react';
import mockDataService, { PortfolioSummary } from '../services/mockDataService';

export const PortfolioSummaryWidget: React.FC = () => {
  const [data, setData] = useState<PortfolioSummary | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());

  useEffect(() => {
    const unsubscribe = mockDataService.subscribePortfolioSummary((summary) => {
      setData(summary);
      setLastUpdated(Date.now());
    });
    return unsubscribe;
  }, []);

  if (!data) return <div className="shimmer-bg h-full w-full rounded" />;

  const formatUSD = (val: number) => {
    if (val >= 1e9) return `$${(val / 1e9).toFixed(3)} Billion`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(2)} Million`;
    return `$${val.toLocaleString()}`;
  };

  const isUp = data.dailyChange >= 0;

  return (
    <div className="flex flex-col gap-4 h-full text-xs select-text justify-between">
      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-[var(--bg-dashboard)]/60 rounded border border-[var(--border-color)] flex flex-col justify-center">
          <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[10px]">
            Assets Under Management (AUM)
          </span>
          <span className="text-sm font-bold text-[var(--text-primary)] mono-font mt-1">
            {formatUSD(data.aum)}
          </span>
          <span
            className={`text-[10px] font-semibold mt-1 flex items-center gap-1 ${
              isUp ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'
            }`}
          >
            {isUp ? '▲' : '▼'} {formatUSD(Math.abs(data.dailyChange))} ({isUp ? '+' : ''}
            {data.dailyChangePercent.toFixed(2)}%)
          </span>
        </div>

        <div className="p-3 bg-[var(--bg-dashboard)]/60 rounded border border-[var(--border-color)] flex flex-col justify-center">
          <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[10px]">
            Available Cash Reserve
          </span>
          <span className="text-sm font-bold text-[var(--text-primary)] mono-font mt-1">
            {formatUSD(data.cashBalance)}
          </span>
          <span className="text-[10px] text-[var(--text-secondary)] mt-1">
            Leverage Ratio: <strong className="mono-font">{data.leverageRatio.toFixed(2)}x</strong>
          </span>
        </div>
      </div>

      {/* Asset Allocation Breakdown */}
      <div className="flex flex-col gap-2">
        <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[10px] select-none">
          Asset Class Allocations
        </span>
        
        {/* Horizontal Allocation Bar */}
        <div className="w-full h-4 rounded overflow-hidden flex border border-[var(--border-color)]">
          <div style={{ width: `${data.allocation.equities}%`, backgroundColor: 'var(--chart-1)' }} title={`Equities: ${data.allocation.equities}%`} />
          <div style={{ width: `${data.allocation.fixedIncome}%`, backgroundColor: 'var(--chart-2)' }} title={`Fixed Income: ${data.allocation.fixedIncome}%`} />
          <div style={{ width: `${data.allocation.alternatives}%`, backgroundColor: 'var(--chart-3)' }} title={`Alternatives: ${data.allocation.alternatives}%`} />
          <div style={{ width: `${data.allocation.derivatives}%`, backgroundColor: 'var(--chart-4)' }} title={`Derivatives: ${data.allocation.derivatives}%`} />
          <div style={{ width: `${data.allocation.cash}%`, backgroundColor: 'var(--chart-5)' }} title={`Cash: ${data.allocation.cash}%`} />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-y-1.5 gap-x-2 text-[10px] text-[var(--text-secondary)] select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--chart-1)' }} />
            <span>Equities: <strong className="mono-font">{data.allocation.equities}%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--chart-2)' }} />
            <span>Fixed Inc: <strong className="mono-font">{data.allocation.fixedIncome}%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--chart-3)' }} />
            <span>Alts: <strong className="mono-font">{data.allocation.alternatives}%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--chart-4)' }} />
            <span>Derivs: <strong className="mono-font">{data.allocation.derivatives}%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--chart-5)' }} />
            <span>Cash: <strong className="mono-font">{data.allocation.cash}%</strong></span>
          </div>
        </div>
      </div>
      
      {/* Active count footer */}
      <div className="text-[10px] text-[var(--text-muted)] border-t border-[var(--border-color)] pt-2 select-none">
        Active Trade count: <strong className="text-[var(--text-primary)] mono-font">{data.activeTrades}</strong>
      </div>
    </div>
  );
};

export default PortfolioSummaryWidget;
