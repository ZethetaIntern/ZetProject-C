import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PortfolioSummaryWidget from '../widgets/PortfolioSummaryWidget';
import NAVPerformanceWidget from '../widgets/NAVPerformanceWidget';
import ValueAtRiskWidget from '../widgets/ValueAtRiskWidget';
import DrawdownWidget from '../widgets/DrawdownWidget';
import CorrelationMatrixWidget from '../widgets/CorrelationMatrixWidget';
import BrinsonAttributionWidget from '../widgets/BrinsonAttributionWidget';
import RiskMetricsWidget from '../widgets/RiskMetricsWidget';
import SectorAllocationWidget from '../widgets/SectorAllocationWidget';
import TransactionLogWidget from '../widgets/TransactionLogWidget';
import YieldCurveWidget from '../widgets/YieldCurveWidget';

// Mock Recharts elements for jsdom compatibility
vi.mock('recharts', () => {
  return {
    ResponsiveContainer: ({ children }: any) => <div className="mock-container">{children}</div>,
    AreaChart: ({ children }: any) => <div data-testid="area-chart">{children}</div>,
    Area: () => <div data-testid="area" />,
    BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
    Bar: () => <div data-testid="bar" />,
    LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
    Line: () => <div data-testid="line" />,
    XAxis: () => null,
    YAxis: () => null,
    CartesianGrid: () => null,
    Tooltip: () => null,
    Legend: () => null,
  };
});

describe('Widgets Integration Rendering', () => {
  it('1. PortfolioSummaryWidget', async () => {
    render(<PortfolioSummaryWidget />);
    expect(await screen.findByText(/Assets Under Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Available Cash Reserve/i)).toBeInTheDocument();
  });

  it('2. NAVPerformanceWidget', async () => {
    render(<NAVPerformanceWidget />);
    expect(await screen.findByText(/Historical Net Asset Value/i)).toBeInTheDocument();
  });

  it('3. ValueAtRiskWidget', async () => {
    render(<ValueAtRiskWidget />);
    expect(await screen.findByText(/Value at Risk/i)).toBeInTheDocument();
  });

  it('4. DrawdownWidget', async () => {
    render(<DrawdownWidget />);
    expect(await screen.findByText(/Historical Drawdowns/i)).toBeInTheDocument();
  });

  it('5. CorrelationMatrixWidget', async () => {
    render(<CorrelationMatrixWidget />);
    expect(await screen.findByText(/Correlation Matrix/i)).toBeInTheDocument();
  });

  it('6. BrinsonAttributionWidget', async () => {
    render(<BrinsonAttributionWidget />);
    expect(await screen.findByText(/Brinson Performance Attribution/i)).toBeInTheDocument();
  });

  it('7. RiskMetricsWidget', async () => {
    render(<RiskMetricsWidget />);
    expect(await screen.findByText(/Sharpe Ratio/i)).toBeInTheDocument();
  });

  it('8. SectorAllocationWidget', async () => {
    render(<SectorAllocationWidget />);
    expect(await screen.findByText(/Sector Allocations/i)).toBeInTheDocument();
  });

  it('9. TransactionLogWidget', async () => {
    render(<TransactionLogWidget />);
    expect(await screen.findByText(/Live Stream Transaction Log/i)).toBeInTheDocument();
  });

  it('10. YieldCurveWidget', async () => {
    render(<YieldCurveWidget />);
    expect(await screen.findByText(/Fixed Income Yield Curve/i)).toBeInTheDocument();
  });
});
