import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import mockDataService from '../services/mockDataService';

export const BrinsonAttributionWidget: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(mockDataService.getBrinsonAttribution());
  }, []);

  return (
    <div className="flex flex-col h-full gap-2 text-xs">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2 select-none">
        <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[10px]">
          Brinson Performance Attribution (Bps)
        </span>
        <span className="text-[9px] text-[var(--text-secondary)]">vs. MSCI World Benchmark</span>
      </div>

      <div className="flex-grow w-full min-h-[140px] mt-1 relative z-10 select-none">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="sector"
              tick={{ fill: 'var(--text-secondary)', fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
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
              wrapperStyle={{ fontSize: '9px', color: 'var(--text-secondary)', paddingTop: '10px' }}
            />
            <Bar name="Allocation Effect" dataKey="allocation" fill="var(--chart-1)" radius={[2, 2, 0, 0]} />
            <Bar name="Selection Effect" dataKey="selection" fill="var(--chart-2)" radius={[2, 2, 0, 0]} />
            <Bar name="Interaction Effect" dataKey="interaction" fill="var(--chart-3)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BrinsonAttributionWidget;
