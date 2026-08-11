import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import mockDataService, { YieldCurvePoint } from '../services/mockDataService';

export const YieldCurveWidget: React.FC = () => {
  const [data, setData] = useState<YieldCurvePoint[]>([]);

  useEffect(() => {
    const unsubscribe = mockDataService.subscribeYieldCurve((curve) => {
      setData(curve);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="flex flex-col h-full gap-2 text-xs">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2 select-none">
        <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[10px]">
          Fixed Income Yield Curve (%)
        </span>
        <span className="text-[9px] text-[var(--text-secondary)]">Ex-Ante Yield to Maturity</span>
      </div>

      <div className="flex-grow w-full min-h-[140px] mt-1 relative z-10 select-none">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="tenor"
              tick={{ fill: 'var(--text-secondary)', fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[3.5, 6.0]}
              tick={{ fill: 'var(--text-secondary)', fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <RechartsTooltip
              formatter={(value: any) => `${value}%`}
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
            <Line
              type="monotone"
              name="Meridian Bond Yield"
              dataKey="yieldVal"
              stroke="var(--chart-2)"
              strokeWidth={2}
              activeDot={{ r: 6 }}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              name="US Treasury Benchmark"
              dataKey="benchmarkYieldVal"
              stroke="var(--chart-3)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YieldCurveWidget;
