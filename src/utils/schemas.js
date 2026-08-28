import { z } from "zod";
export const WidgetLayoutSchema = z.object({
  id: z.string().uuid(),
  type: z.string().min(1),
  x: z.number().int().min(0),
  y: z.number().int().min(0),
  w: z.number().int().min(1),
  h: z.number().int().min(1),
  isCollapsed: z.boolean().default(false)
}).strict();
export const DashboardLayoutSchema = z.array(WidgetLayoutSchema);
export const TransactionSchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  symbol: z.string(),
  side: z.enum(["BUY", "SELL"]),
  qty: z.number().positive(),
  price: z.number().positive(),
  status: z.enum(["COMPLETED", "PENDING", "REJECTED"])
});
export const PortfolioSummarySchema = z.object({
  aum: z.number().nonnegative(),
  dailyChange: z.number(),
  dailyChangePercent: z.number(),
  cashBalance: z.number().nonnegative(),
  leverageRatio: z.number().nonnegative(),
  activeTrades: z.number().int().nonnegative(),
  allocation: z.object({
    equities: z.number().min(0).max(100),
    fixedIncome: z.number().min(0).max(100),
    alternatives: z.number().min(0).max(100),
    derivatives: z.number().min(0).max(100),
    cash: z.number().min(0).max(100)
  })
});
export const YieldCurvePointSchema = z.object({
  tenor: z.string(),
  maturityYears: z.number().positive(),
  yieldVal: z.number().nonnegative(),
  benchmarkYieldVal: z.number().nonnegative()
});
export const YieldCurveSchema = z.array(YieldCurvePointSchema);
export const NAVHistoryPointSchema = z.object({
  timestamp: z.number(),
  nav: z.number().positive(),
  benchmark: z.number().positive()
});
export const NAVHistorySchema = z.array(NAVHistoryPointSchema);
export const RiskMetricsSchema = z.object({
  sharpeRatio: z.number(),
  sortinoRatio: z.number(),
  treynorRatio: z.number(),
  alpha: z.number(),
  beta: z.number(),
  informationRatio: z.number(),
  maxDrawdown: z.number()
});
