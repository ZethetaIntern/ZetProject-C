import { 
  PortfolioSummarySchema, 
  YieldCurveSchema, 
  NAVHistorySchema, 
  RiskMetricsSchema,
  TransactionSchema 
} from '../utils/schemas';

export interface PortfolioSummary {
  aum: number;
  dailyChange: number;
  dailyChangePercent: number;
  cashBalance: number;
  leverageRatio: number;
  activeTrades: number;
  allocation: {
    equities: number;
    fixedIncome: number;
    alternatives: number;
    derivatives: number;
    cash: number;
  };
}

export interface YieldCurvePoint {
  tenor: string;
  maturityYears: number;
  yieldVal: number;
  benchmarkYieldVal: number;
}

export interface NAVHistoryPoint {
  timestamp: number;
  nav: number;
  benchmark: number;
}

export interface RiskMetrics {
  sharpeRatio: number;
  sortinoRatio: number;
  treynorRatio: number;
  alpha: number;
  beta: number;
  informationRatio: number;
  maxDrawdown: number;
}

export interface Transaction {
  id: string;
  timestamp: number;
  symbol: string;
  side: 'BUY' | 'SELL';
  qty: number;
  price: number;
  status: 'COMPLETED' | 'PENDING' | 'REJECTED';
}

type SubscriptionCallback<T> = (data: T) => void;

class MockDataService {
  private isConnected = true;
  private refreshInterval = 3000;
  private wsIntervalId: any = null;
  private pollIntervalId: any = null;

  // Active listeners
  private transactionListeners = new Set<SubscriptionCallback<Transaction>>();
  private portfolioSummaryListeners = new Set<SubscriptionCallback<PortfolioSummary>>();
  private yieldCurveListeners = new Set<SubscriptionCallback<YieldCurvePoint[]>>();
  private riskMetricsListeners = new Set<SubscriptionCallback<RiskMetrics>>();
  
  // Connection change callbacks
  private connectionStateListeners = new Set<(connected: boolean) => void>();

  // Cached states
  private currentSummary: PortfolioSummary;
  private currentYieldCurve: YieldCurvePoint[];
  private currentMetrics: RiskMetrics;
  private transactions: Transaction[] = [];

  constructor() {
    // Set initial values
    this.currentSummary = {
      aum: 45280450000,
      dailyChange: 145920000,
      dailyChangePercent: 0.32,
      cashBalance: 2450000000,
      leverageRatio: 1.15,
      activeTrades: 42,
      allocation: {
        equities: 52.4,
        fixedIncome: 28.1,
        alternatives: 10.5,
        derivatives: 4.0,
        cash: 5.0,
      },
    };

    this.currentYieldCurve = [
      { tenor: '1M', maturityYears: 1 / 12, yieldVal: 5.35, benchmarkYieldVal: 5.40 },
      { tenor: '3M', maturityYears: 3 / 12, yieldVal: 5.28, benchmarkYieldVal: 5.38 },
      { tenor: '6M', maturityYears: 6 / 12, yieldVal: 5.12, benchmarkYieldVal: 5.25 },
      { tenor: '1Y', maturityYears: 1, yieldVal: 4.85, benchmarkYieldVal: 4.98 },
      { tenor: '2Y', maturityYears: 2, yieldVal: 4.54, benchmarkYieldVal: 4.62 },
      { tenor: '5Y', maturityYears: 5, yieldVal: 4.22, benchmarkYieldVal: 4.28 },
      { tenor: '10Y', maturityYears: 10, yieldVal: 4.15, benchmarkYieldVal: 4.20 },
      { tenor: '30Y', maturityYears: 30, yieldVal: 4.32, benchmarkYieldVal: 4.35 },
    ];

    this.currentMetrics = {
      sharpeRatio: 2.14,
      sortinoRatio: 2.45,
      treynorRatio: 0.185,
      alpha: 3.42,
      beta: 0.94,
      informationRatio: 0.85,
      maxDrawdown: -12.45,
    };

    // Prepopulate some transactions
    const symbols = ['AAPL', 'MSFT', 'NVDA', 'UST10Y', 'GLD', 'USO', 'EURUSD'];
    for (let i = 0; i < 15; i++) {
      const isBuy = Math.random() > 0.4;
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const qty = Math.floor(Math.random() * 5000) + 100;
      const basePrice = symbol === 'UST10Y' ? 98.4 : symbol === 'GLD' ? 220 : symbol === 'EURUSD' ? 1.08 : 250;
      const price = basePrice * (1 + (Math.random() - 0.5) * 0.05);
      
      this.transactions.push({
        id: crypto.randomUUID(),
        timestamp: Date.now() - (15 - i) * 60000,
        symbol,
        side: isBuy ? 'BUY' : 'SELL',
        qty,
        price: parseFloat(price.toFixed(2)),
        status: 'COMPLETED',
      });
    }

    if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
      this.startDataGeneration();
    }
  }

  // Start simulating WebSocket ticks / Polling ticks
  private startDataGeneration() {
    const tick = () => {
      if (!this.isConnected) return;

      // 1. Generate new transaction
      if (Math.random() > 0.4) {
        const symbols = ['AAPL', 'MSFT', 'NVDA', 'UST10Y', 'GLD', 'USO', 'EURUSD', 'BTCUSD'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const isBuy = Math.random() > 0.4;
        const qty = Math.floor(Math.random() * 4000) + 50;
        const basePrice = symbol === 'BTCUSD' ? 62000 : symbol === 'UST10Y' ? 98.2 : symbol === 'EURUSD' ? 1.09 : 180;
        const price = basePrice * (1 + (Math.random() - 0.5) * 0.02);
        
        const tx: Transaction = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          symbol,
          side: isBuy ? 'BUY' : 'SELL',
          qty,
          price: parseFloat(price.toFixed(2)),
          status: 'COMPLETED',
        };

        const validated = TransactionSchema.safeParse(tx);
        if (validated.success) {
          this.transactions.unshift(validated.data as Transaction);
          if (this.transactions.length > 100) this.transactions.pop();
          this.transactionListeners.forEach(cb => cb(validated.data as Transaction));
        }
      }

      // 2. Fluctuate portfolio summary
      const summaryDelta = (Math.random() - 0.48) * 45000000; // general upward bias
      const newAUM = this.currentSummary.aum + summaryDelta;
      const newDailyChange = this.currentSummary.dailyChange + summaryDelta;
      const originalAUM = 45134530000;
      const newDailyChangePercent = (newDailyChange / originalAUM) * 100;
      
      const summary: PortfolioSummary = {
        ...this.currentSummary,
        aum: parseFloat(newAUM.toFixed(2)),
        dailyChange: parseFloat(newDailyChange.toFixed(2)),
        dailyChangePercent: parseFloat(newDailyChangePercent.toFixed(4)),
        activeTrades: this.currentSummary.activeTrades + (Math.random() > 0.7 ? 1 : Math.random() > 0.7 ? -1 : 0),
      };

      const validatedSummary = PortfolioSummarySchema.safeParse(summary);
      if (validatedSummary.success) {
        this.currentSummary = validatedSummary.data as PortfolioSummary;
        this.portfolioSummaryListeners.forEach(cb => cb(this.currentSummary));
      }

      // 3. Fluctuate Yield Curve
      const yieldCurve = this.currentYieldCurve.map(pt => {
        const fluctuation = (Math.random() - 0.5) * 0.05;
        const benchmarkFluctuation = (Math.random() - 0.5) * 0.04;
        return {
          ...pt,
          yieldVal: parseFloat(Math.max(0.1, pt.yieldVal + fluctuation).toFixed(3)),
          benchmarkYieldVal: parseFloat(Math.max(0.1, pt.benchmarkYieldVal + benchmarkFluctuation).toFixed(3)),
        };
      });

      const validatedYield = YieldCurveSchema.safeParse(yieldCurve);
      if (validatedYield.success) {
        this.currentYieldCurve = validatedYield.data as YieldCurvePoint[];
        this.yieldCurveListeners.forEach(cb => cb(this.currentYieldCurve));
      }

      // 4. Fluctuate Risk Metrics
      const metricsDelta = (Math.random() - 0.5) * 0.02;
      const metrics: RiskMetrics = {
        sharpeRatio: parseFloat(Math.max(0.1, this.currentMetrics.sharpeRatio + metricsDelta).toFixed(2)),
        sortinoRatio: parseFloat(Math.max(0.1, this.currentMetrics.sortinoRatio + metricsDelta * 1.1).toFixed(2)),
        treynorRatio: parseFloat(Math.max(0.01, this.currentMetrics.treynorRatio + metricsDelta * 0.05).toFixed(4)),
        alpha: parseFloat((this.currentMetrics.alpha + metricsDelta * 3).toFixed(2)),
        beta: parseFloat(Math.max(0.1, this.currentMetrics.beta + metricsDelta * 0.1).toFixed(3)),
        informationRatio: parseFloat(Math.max(0.1, this.currentMetrics.informationRatio + metricsDelta * 0.4).toFixed(2)),
        maxDrawdown: parseFloat(Math.min(-1, Math.max(-45, this.currentMetrics.maxDrawdown + metricsDelta * 0.5)).toFixed(2)),
      };

      const validatedMetrics = RiskMetricsSchema.safeParse(metrics);
      if (validatedMetrics.success) {
        this.currentMetrics = validatedMetrics.data as RiskMetrics;
        this.riskMetricsListeners.forEach(cb => cb(this.currentMetrics));
      }
    };

    // Simulate WebSocket connection sending ticks
    this.wsIntervalId = setInterval(tick, this.refreshInterval);
  }

  // Toggle connection state (online/offline simulation)
  public setConnectionState(connected: boolean) {
    if (this.isConnected === connected) return;
    this.isConnected = connected;
    this.connectionStateListeners.forEach(cb => cb(connected));

    if (!connected) {
      // Simulate fallbacks: we clear standard fast interval
      clearInterval(this.wsIntervalId);
      
      // Setup slow polling fallback interval (e.g. 8 seconds)
      this.pollIntervalId = setInterval(() => {
        // Simple slower tick simulated for connection drop
        // Client UI will display a stale indicators and fallback notice
      }, 8000);
    } else {
      clearInterval(this.pollIntervalId);
      this.startDataGeneration();
    }
  }

  public getConnectionState(): boolean {
    return this.isConnected;
  }

  // Subscribe methods
  public subscribeTransactions(cb: SubscriptionCallback<Transaction>) {
    this.transactionListeners.add(cb);
    return () => this.transactionListeners.delete(cb);
  }

  public subscribePortfolioSummary(cb: SubscriptionCallback<PortfolioSummary>) {
    this.portfolioSummaryListeners.add(cb);
    // Send initial cached value immediately
    cb(this.currentSummary);
    return () => this.portfolioSummaryListeners.delete(cb);
  }

  public subscribeYieldCurve(cb: SubscriptionCallback<YieldCurvePoint[]>) {
    this.yieldCurveListeners.add(cb);
    cb(this.currentYieldCurve);
    return () => this.yieldCurveListeners.delete(cb);
  }

  public subscribeRiskMetrics(cb: SubscriptionCallback<RiskMetrics>) {
    this.riskMetricsListeners.add(cb);
    cb(this.currentMetrics);
    return () => this.riskMetricsListeners.delete(cb);
  }

  public subscribeConnectionState(cb: (connected: boolean) => void) {
    this.connectionStateListeners.add(cb);
    cb(this.isConnected);
    return () => this.connectionStateListeners.delete(cb);
  }

  // REST API simulated Endpoints

  public getTransactions(): Transaction[] {
    return [...this.transactions];
  }

  public getNAVHistory(range: string): NAVHistoryPoint[] {
    const pointsCount = range === '1D' ? 24 : range === '1W' ? 7 : range === '1M' ? 30 : range === 'YTD' ? 150 : range === '1Y' ? 250 : 500;
    const history: NAVHistoryPoint[] = [];
    let nav = 100.0;
    let benchmark = 100.0;
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const step = range === '1D' ? dayMs / 24 : dayMs;

    for (let i = pointsCount; i >= 0; i--) {
      const timestamp = now - i * step;
      // Correlated random walk
      const marketMove = (Math.random() - 0.495) * 2; // general market rise
      const alphaMove = (Math.random() - 0.48) * 1.5; // Meridian outperformance
      
      benchmark += marketMove;
      nav += marketMove * 0.95 + alphaMove; // beta + alpha

      history.push({
        timestamp,
        nav: parseFloat(Math.max(10, nav).toFixed(2)),
        benchmark: parseFloat(Math.max(10, benchmark).toFixed(2)),
      });
    }

    const validated = NAVHistorySchema.safeParse(history);
    if (validated.success) {
      return validated.data as NAVHistoryPoint[];
    }
    return [];
  }

  public getCorrelationMatrix(): { assets: string[]; matrix: number[][] } {
    const assets = ['Equities', 'Fixed Income', 'Commodities', 'FX', 'Alternatives'];
    // High quality asset correlation matrix
    const matrix = [
      [1.0, 0.12, 0.35, -0.22, 0.45],  // Equities
      [0.12, 1.0, -0.05, 0.28, -0.15],  // Fixed Income
      [0.35, -0.05, 1.0, -0.42, 0.25],  // Commodities
      [-0.22, 0.28, -0.42, 1.0, -0.10], // FX
      [0.45, -0.15, 0.25, -0.10, 1.0],  // Alternatives
    ];

    // Fluctuate slightly
    const dynamicMatrix = matrix.map((row, r) => 
      row.map((val, c) => {
        if (r === c) return 1.0;
        const delta = (Math.random() - 0.5) * 0.02;
        return parseFloat(Math.max(-1.0, Math.min(1.0, val + delta)).toFixed(2));
      })
    );

    return { assets, matrix: dynamicMatrix };
  }

  public getDrawdownHistory(): { timestamp: number; drawdown: number }[] {
    const points = 100;
    const history: { timestamp: number; drawdown: number }[] = [];
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    let peak = 100;
    let current = 100;

    for (let i = points; i >= 0; i--) {
      const timestamp = now - i * dayMs;
      const valDelta = (Math.random() - 0.53) * 3; // high volatility random walk
      current += valDelta;
      if (current > peak) peak = current;
      const drawdown = ((current - peak) / peak) * 100;

      history.push({
        timestamp,
        drawdown: parseFloat(Math.min(0, drawdown).toFixed(2)),
      });
    }

    return history;
  }

  public getBrinsonAttribution(): { sector: string; allocation: number; selection: number; interaction: number; total: number }[] {
    const sectors = ['Technology', 'Financials', 'Healthcare', 'Consumer Disc', 'Industrials', 'Energy', 'Materials'];
    const attribution = sectors.map(sector => {
      // Dynamic Brinson values matching Meridian USD 45B portfolio
      const allocation = parseFloat((Math.random() - 0.45).toFixed(2));
      const selection = parseFloat((Math.random() - 0.4).toFixed(2));
      const interaction = parseFloat(((allocation * selection) * 0.1).toFixed(2));
      const total = parseFloat((allocation + selection + interaction).toFixed(2));

      return { sector, allocation, selection, interaction, total };
    });

    return attribution;
  }
}

export const mockDataService = new MockDataService();
export default mockDataService;
