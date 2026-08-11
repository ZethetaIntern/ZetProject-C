import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import mockDataService, { NAVHistoryPoint } from '../services/mockDataService';

export const NAVPerformanceWidget: React.FC = () => {
  const [range, setRange] = useState<string>('1M');
  const [data, setData] = useState<NAVHistoryPoint[]>([]);

  useEffect(() => {
    // Fetch NAV history based on range
    const history = mockDataService.getNAVHistory(range);
    setData(history);
  }, [range]);

  const ranges = ['1D', '1W', '1M', 'YTD', '1Y'];

  const formatDate = (val: number) => {
    const d = new Date(val);
    if (range === '1D') {
      return `${d.getHours()}:00`;
    }
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  return (
    <div className="flex flex-col h-full gap-2 text-xs">
      {/* Zoom Tabs */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2 select-none">
        <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[10px]">
          Historical Net Asset Value ($)
        </span>
        <div className="flex items-center gap-1 bg-[var(--bg-dashboard)] p-0.5 rounded border border-[var(--border-color)]">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="px-2 py-0.5 rounded text-[10px] font-semibold transition-colors focus:outline-none"
              style={{
                backgroundColor: range === r ? 'var(--bg-card)' : 'transparent',
                color: range === r ? 'var(--accent-color)' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-grow w-full min-h-[140px] mt-1 relative z-10 select-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorNav" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorBench" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--text-muted)" stopOpacity={0.1} />
                <stop offset="95%" stopColor="var(--text-muted)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatDate}
              tick={{ fill: 'var(--text-secondary)', fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fill: 'var(--text-secondary)', fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <RechartsTooltip
              labelFormatter={(label) => new Date(label).toLocaleString()}
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '11px',
                borderRadius: '4px',
              }}
            />
            <Area
              type="monotone"
              name="Meridian NAV"
              dataKey="nav"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorNav)"
            />
            <Area
              type="monotone"
              name="S&P 500 Bench"
              dataKey="benchmark"
              stroke="var(--text-muted)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#colorBench)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NAVPerformanceWidget;
