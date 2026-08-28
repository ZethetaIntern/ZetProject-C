import {
  PortfolioSummarySchema,
  YieldCurveSchema,
  NAVHistorySchema,
  RiskMetricsSchema,
  TransactionSchema
} from "../utils/schemas";
class MockDataService {
  isConnected = true;
  refreshInterval = 3e3;
  wsIntervalId = null;
  pollIntervalId = null;
  // Active listeners
  transactionListeners = /* @__PURE__ */ new Set();
  portfolioSummaryListeners = /* @__PURE__ */ new Set();
  yieldCurveListeners = /* @__PURE__ */ new Set();
  riskMetricsListeners = /* @__PURE__ */ new Set();
  // Connection change callbacks
  connectionStateListeners = /* @__PURE__ */ new Set();
  // Cached states
  currentSummary;
  currentYieldCurve;
  currentMetrics;
  transactions = [];
  constructor() {
    this.currentSummary = {
      aum: 4528045e4,
      dailyChange: 14592e4,
      dailyChangePercent: 0.32,
      cashBalance: 245e7,
      leverageRatio: 1.15,
      activeTrades: 42,
      allocation: {
        equities: 52.4,
        fixedIncome: 28.1,
        alternatives: 10.5,
        derivatives: 4,
        cash: 5
      }
    };
    this.currentYieldCurve = [
      { tenor: "1M", maturityYears: 1 / 12, yieldVal: 5.35, benchmarkYieldVal: 5.4 },
      { tenor: "3M", maturityYears: 3 / 12, yieldVal: 5.28, benchmarkYieldVal: 5.38 },
      { tenor: "6M", maturityYears: 6 / 12, yieldVal: 5.12, benchmarkYieldVal: 5.25 },
      { tenor: "1Y", maturityYears: 1, yieldVal: 4.85, benchmarkYieldVal: 4.98 },
      { tenor: "2Y", maturityYears: 2, yieldVal: 4.54, benchmarkYieldVal: 4.62 },
      { tenor: "5Y", maturityYears: 5, yieldVal: 4.22, benchmarkYieldVal: 4.28 },
      { tenor: "10Y", maturityYears: 10, yieldVal: 4.15, benchmarkYieldVal: 4.2 },
      { tenor: "30Y", maturityYears: 30, yieldVal: 4.32, benchmarkYieldVal: 4.35 }
    ];
    this.currentMetrics = {
      sharpeRatio: 2.14,
      sortinoRatio: 2.45,
      treynorRatio: 0.185,
      alpha: 3.42,
      beta: 0.94,
      informationRatio: 0.85,
      maxDrawdown: -12.45
    };
    const symbols = ["AAPL", "MSFT", "NVDA", "UST10Y", "GLD", "USO", "EURUSD"];
    for (let i = 0; i < 15; i++) {
      const isBuy = Math.random() > 0.4;
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const qty = Math.floor(Math.random() * 5e3) + 100;
      const basePrice = symbol === "UST10Y" ? 98.4 : symbol === "GLD" ? 220 : symbol === "EURUSD" ? 1.08 : 250;
      const price = basePrice * (1 + (Math.random() - 0.5) * 0.05);
      this.transactions.push({
        id: crypto.randomUUID(),
        timestamp: Date.now() - (15 - i) * 6e4,
        symbol,
        side: isBuy ? "BUY" : "SELL",
        qty,
        price: parseFloat(price.toFixed(2)),
        status: "COMPLETED"
      });
    }
    if (typeof process === "undefined" || process.env.NODE_ENV !== "test") {
      this.startDataGeneration();
    }
  }
  // Start simulating WebSocket ticks / Polling ticks
  startDataGeneration() {
    const tick = () => {
      if (!this.isConnected) return;
      if (Math.random() > 0.4) {
        const symbols = ["AAPL", "MSFT", "NVDA", "UST10Y", "GLD", "USO", "EURUSD", "BTCUSD"];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const isBuy = Math.random() > 0.4;
        const qty = Math.floor(Math.random() * 4e3) + 50;
        const basePrice = symbol === "BTCUSD" ? 62e3 : symbol === "UST10Y" ? 98.2 : symbol === "EURUSD" ? 1.09 : 180;
        const price = basePrice * (1 + (Math.random() - 0.5) * 0.02);
        const tx = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          symbol,
          side: isBuy ? "BUY" : "SELL",
          qty,
          price: parseFloat(price.toFixed(2)),
          status: "COMPLETED"
        };
        const validated = TransactionSchema.safeParse(tx);
        if (validated.success) {
          this.transactions.unshift(validated.data);
          if (this.transactions.length > 100) this.transactions.pop();
          this.transactionListeners.forEach((cb) => cb(validated.data));
        }
      }
      const summaryDelta = (Math.random() - 0.48) * 45e6;
      const newAUM = this.currentSummary.aum + summaryDelta;
      const newDailyChange = this.currentSummary.dailyChange + summaryDelta;
      const originalAUM = 4513453e4;
      const newDailyChangePercent = newDailyChange / originalAUM * 100;
      const summary = {
        ...this.currentSummary,
        aum: parseFloat(newAUM.toFixed(2)),
        dailyChange: parseFloat(newDailyChange.toFixed(2)),
        dailyChangePercent: parseFloat(newDailyChangePercent.toFixed(4)),
        activeTrades: this.currentSummary.activeTrades + (Math.random() > 0.7 ? 1 : Math.random() > 0.7 ? -1 : 0)
      };
      const validatedSummary = PortfolioSummarySchema.safeParse(summary);
      if (validatedSummary.success) {
        this.currentSummary = validatedSummary.data;
        this.portfolioSummaryListeners.forEach((cb) => cb(this.currentSummary));
      }
      const yieldCurve = this.currentYieldCurve.map((pt) => {
        const fluctuation = (Math.random() - 0.5) * 0.05;
        const benchmarkFluctuation = (Math.random() - 0.5) * 0.04;
        return {
          ...pt,
          yieldVal: parseFloat(Math.max(0.1, pt.yieldVal + fluctuation).toFixed(3)),
          benchmarkYieldVal: parseFloat(Math.max(0.1, pt.benchmarkYieldVal + benchmarkFluctuation).toFixed(3))
        };
      });
      const validatedYield = YieldCurveSchema.safeParse(yieldCurve);
      if (validatedYield.success) {
        this.currentYieldCurve = validatedYield.data;
        this.yieldCurveListeners.forEach((cb) => cb(this.currentYieldCurve));
      }
      const metricsDelta = (Math.random() - 0.5) * 0.02;
      const metrics = {
        sharpeRatio: parseFloat(Math.max(0.1, this.currentMetrics.sharpeRatio + metricsDelta).toFixed(2)),
        sortinoRatio: parseFloat(Math.max(0.1, this.currentMetrics.sortinoRatio + metricsDelta * 1.1).toFixed(2)),
        treynorRatio: parseFloat(Math.max(0.01, this.currentMetrics.treynorRatio + metricsDelta * 0.05).toFixed(4)),
        alpha: parseFloat((this.currentMetrics.alpha + metricsDelta * 3).toFixed(2)),
        beta: parseFloat(Math.max(0.1, this.currentMetrics.beta + metricsDelta * 0.1).toFixed(3)),
        informationRatio: parseFloat(Math.max(0.1, this.currentMetrics.informationRatio + metricsDelta * 0.4).toFixed(2)),
        maxDrawdown: parseFloat(Math.min(-1, Math.max(-45, this.currentMetrics.maxDrawdown + metricsDelta * 0.5)).toFixed(2))
      };
      const validatedMetrics = RiskMetricsSchema.safeParse(metrics);
      if (validatedMetrics.success) {
        this.currentMetrics = validatedMetrics.data;
        this.riskMetricsListeners.forEach((cb) => cb(this.currentMetrics));
      }
    };
    this.wsIntervalId = setInterval(tick, this.refreshInterval);
  }
  // Toggle connection state (online/offline simulation)
  setConnectionState(connected) {
    if (this.isConnected === connected) return;
    this.isConnected = connected;
    this.connectionStateListeners.forEach((cb) => cb(connected));
    if (!connected) {
      clearInterval(this.wsIntervalId);
      this.pollIntervalId = setInterval(() => {
      }, 8e3);
    } else {
      clearInterval(this.pollIntervalId);
      this.startDataGeneration();
    }
  }
  getConnectionState() {
    return this.isConnected;
  }
  // Subscribe methods
  subscribeTransactions(cb) {
    this.transactionListeners.add(cb);
    return () => this.transactionListeners.delete(cb);
  }
  subscribePortfolioSummary(cb) {
    this.portfolioSummaryListeners.add(cb);
    cb(this.currentSummary);
    return () => this.portfolioSummaryListeners.delete(cb);
  }
  subscribeYieldCurve(cb) {
    this.yieldCurveListeners.add(cb);
    cb(this.currentYieldCurve);
    return () => this.yieldCurveListeners.delete(cb);
  }
  subscribeRiskMetrics(cb) {
    this.riskMetricsListeners.add(cb);
    cb(this.currentMetrics);
    return () => this.riskMetricsListeners.delete(cb);
  }
  subscribeConnectionState(cb) {
    this.connectionStateListeners.add(cb);
    cb(this.isConnected);
    return () => this.connectionStateListeners.delete(cb);
  }
  // REST API simulated Endpoints
  getTransactions() {
    return [...this.transactions];
  }
  getNAVHistory(range) {
    const pointsCount = range === "1D" ? 24 : range === "1W" ? 7 : range === "1M" ? 30 : range === "YTD" ? 150 : range === "1Y" ? 250 : 500;
    const history = [];
    let nav = 100;
    let benchmark = 100;
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1e3;
    const step = range === "1D" ? dayMs / 24 : dayMs;
    for (let i = pointsCount; i >= 0; i--) {
      const timestamp = now - i * step;
      const marketMove = (Math.random() - 0.495) * 2;
      const alphaMove = (Math.random() - 0.48) * 1.5;
      benchmark += marketMove;
      nav += marketMove * 0.95 + alphaMove;
      history.push({
        timestamp,
        nav: parseFloat(Math.max(10, nav).toFixed(2)),
        benchmark: parseFloat(Math.max(10, benchmark).toFixed(2))
      });
    }
    const validated = NAVHistorySchema.safeParse(history);
    if (validated.success) {
      return validated.data;
    }
    return [];
  }
  getCorrelationMatrix() {
    const assets = ["Equities", "Fixed Income", "Commodities", "FX", "Alternatives"];
    const matrix = [
      [1, 0.12, 0.35, -0.22, 0.45],
      // Equities
      [0.12, 1, -0.05, 0.28, -0.15],
      // Fixed Income
      [0.35, -0.05, 1, -0.42, 0.25],
      // Commodities
      [-0.22, 0.28, -0.42, 1, -0.1],
      // FX
      [0.45, -0.15, 0.25, -0.1, 1]
      // Alternatives
    ];
    const dynamicMatrix = matrix.map(
      (row, r) => row.map((val, c) => {
        if (r === c) return 1;
        const delta = (Math.random() - 0.5) * 0.02;
        return parseFloat(Math.max(-1, Math.min(1, val + delta)).toFixed(2));
      })
    );
    return { assets, matrix: dynamicMatrix };
  }
  getDrawdownHistory() {
    const points = 100;
    const history = [];
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1e3;
    let peak = 100;
    let current = 100;
    for (let i = points; i >= 0; i--) {
      const timestamp = now - i * dayMs;
      const valDelta = (Math.random() - 0.53) * 3;
      current += valDelta;
      if (current > peak) peak = current;
      const drawdown = (current - peak) / peak * 100;
      history.push({
        timestamp,
        drawdown: parseFloat(Math.min(0, drawdown).toFixed(2))
      });
    }
    return history;
  }
  getBrinsonAttribution() {
    const sectors = ["Technology", "Financials", "Healthcare", "Consumer Disc", "Industrials", "Energy", "Materials"];
    const attribution = sectors.map((sector) => {
      const allocation = parseFloat((Math.random() - 0.45).toFixed(2));
      const selection = parseFloat((Math.random() - 0.4).toFixed(2));
      const interaction = parseFloat((allocation * selection * 0.1).toFixed(2));
      const total = parseFloat((allocation + selection + interaction).toFixed(2));
      return { sector, allocation, selection, interaction, total };
    });
    return attribution;
  }
}
export const mockDataService = new MockDataService();
export default mockDataService;
