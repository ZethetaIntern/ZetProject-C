import React, { useEffect, useState } from 'react';
import mockDataService from '../services/mockDataService';

export const CorrelationMatrixWidget: React.FC = () => {
  const [data, setData] = useState<{ assets: string[]; matrix: number[][] } | null>(null);

  useEffect(() => {
    // Standard subscription/fetch
    setData(mockDataService.getCorrelationMatrix());
  }, []);

  if (!data) return <div className="shimmer-bg h-full w-full rounded" />;

  const { assets, matrix } = data;

  // Helper to color code the heatmap based on correlation coefficient (-1.0 to +1.0)
  const getCellBgColor = (val: number) => {
    if (val === 1) return 'var(--accent-color)';
    if (val >= 0) {
      // Map positive values (0 to 1) to blue intensities
      // Opacity goes from 0.05 to 0.75
      const opacity = 0.05 + val * 0.7;
      return `rgba(59, 130, 246, ${opacity})`;
    } else {
      // Map negative values (-1 to 0) to red intensities
      const opacity = 0.05 + Math.abs(val) * 0.7;
      return `rgba(239, 68, 68, ${opacity})`;
    }
  };

  const getCellTextColor = (val: number) => {
    if (Math.abs(val) > 0.6) return 'white';
    return 'var(--text-primary)';
  };

  return (
    <div className="flex flex-col h-full gap-2 text-xs select-none">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2 select-none">
        <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[10px]">
          Cross-Asset Correlation Matrix
        </span>
        <span className="text-[9px] text-[var(--text-secondary)]">95% Confidence Interval</span>
      </div>

      <div className="flex-grow flex flex-col justify-center mt-2">
        {/* Table header headers */}
        <div className="grid grid-cols-6 gap-1 font-semibold text-[8px] text-[var(--text-secondary)] text-center uppercase tracking-wider mb-1">
          <div className="text-left select-none text-[7px]">Asset</div>
          {assets.map((asset) => (
            <div key={asset} className="truncate" title={asset}>
              {asset.substring(0, 4)}
            </div>
          ))}
        </div>

        {/* Matrix Rows */}
        <div className="flex flex-col gap-1">
          {matrix.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-6 gap-1 items-center">
              <div className="font-bold text-[8px] text-[var(--text-secondary)] truncate uppercase text-left select-none" title={assets[rIdx]}>
                {assets[rIdx].substring(0, 4)}
              </div>
              {row.map((val, cIdx) => (
                <div
                  key={cIdx}
                  className="rounded-sm flex items-center justify-center font-semibold text-[10px] py-2 border border-[var(--border-color)]/20 transition-all hover:scale-105"
                  style={{
                    backgroundColor: getCellBgColor(val),
                    color: getCellTextColor(val),
                    minHeight: '28px',
                  }}
                  title={`${assets[rIdx]} vs ${assets[cIdx]}: ${val}`}
                >
                  {val.toFixed(2)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CorrelationMatrixWidget;
