import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import mockDataService from '../services/mockDataService';

export const DrawdownWidget: React.FC = () => {
  const [data, setData] = useState<{ timestamp: number; drawdown: number }[]>([]);

  useEffect(() => {
    setData(mockDataService.getDrawdownHistory());
  }, []);

  const formatDate = (val: number) => {
    const d = new Date(val);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  return (
    <div className="flex flex-col h-full gap-2 text-xs">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2 select-none">
        <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[10px]">
          Historical Drawdowns (%)
        </span>
        <span className="text-[9px] font-semibold text-[var(--color-down)]">
          Max: -12.45%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-1 select-none">
        <div className="p-1.5 bg-[var(--bg-dashboard)]/40 rounded border border-[var(--border-color)] flex flex-col justify-center">
          <span className="text-[var(--text-muted)] text-[8px] uppercase tracking-wider">Peak Portfolio AUM</span>
          <span className="text-xs font-bold text-[var(--text-primary)] mono-font mt-0.5">$45.32 Billion</span>
        </div>
        <div className="p-1.5 bg-[var(--bg-dashboard)]/40 rounded border border-[var(--border-color)] flex flex-col justify-center">
          <span className="text-[var(--text-muted)] text-[8px] uppercase tracking-wider">Max Recovery Duration</span>
          <span className="text-xs font-bold text-[var(--text-primary)] mono-font mt-0.5">45 Days</span>
        </div>
      </div>

      {/* Area Chart */}
      <div className="flex-grow w-full min-h-[90px] mt-1 relative z-10 select-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 2, right: 2, left: -30, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-down)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--color-down)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatDate}
              tick={{ fill: 'var(--text-secondary)', fontSize: 8 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[-15, 0]}
              tick={{ fill: 'var(--text-secondary)', fontSize: 8 }}
              axisLine={false}
              tickLine={false}
            />
            <RechartsTooltip
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '10px',
                borderRadius: '4px',
              }}
            />
            <Area
              type="monotone"
              name="Drawdown"
              dataKey="drawdown"
              stroke="var(--color-down)"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#colorDrawdown)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DrawdownWidget;
