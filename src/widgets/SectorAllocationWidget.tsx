import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

export const SectorAllocationWidget: React.FC = () => {
  // Mock sector allocations for Meridian Capital (USD 45B portfolio)
  const data = [
    { name: 'Tech', Portfolio: 28.5, Benchmark: 24.2 },
    { name: 'Finance', Portfolio: 18.2, Benchmark: 15.4 },
    { name: 'Health', Portfolio: 14.1, Benchmark: 12.8 },
    { name: 'Cons Disc', Portfolio: 11.5, Benchmark: 10.5 },
    { name: 'Energy', Portfolio: 8.4, Benchmark: 6.2 },
    { name: 'Industrials', Portfolio: 7.3, Benchmark: 8.5 },
    { name: 'Materials', Portfolio: 4.5, Benchmark: 5.1 },
  ];

  return (
    <div className="flex flex-col h-full gap-2 text-xs">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2 select-none">
        <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[10px]">
          Sector Allocations (%)
        </span>
        <span className="text-[9px] text-[var(--text-secondary)]">Active vs. Index Targets</span>
      </div>

      <div className="flex-grow w-full min-h-[140px] mt-1 relative z-10 select-none">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 35]}
              tick={{ fill: 'var(--text-secondary)', fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: 'var(--text-secondary)', fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <RechartsTooltip
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '11px',
                borderRadius: '4px',
              }}
            />
            <Legend
              iconSize={8}
              wrapperStyle={{ fontSize: '9px', color: 'var(--text-secondary)', paddingTop: '5px' }}
            />
            <Bar name="Meridian Active" dataKey="Portfolio" fill="var(--chart-1)" radius={[0, 2, 2, 0]} />
            <Bar name="MSCI Benchmark" dataKey="Benchmark" fill="var(--scrollbar-thumb)" radius={[0, 2, 2, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SectorAllocationWidget;
