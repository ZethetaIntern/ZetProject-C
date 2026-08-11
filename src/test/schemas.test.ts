import { describe, it, expect } from 'vitest';
import { WidgetLayoutSchema, DashboardLayoutSchema, TransactionSchema } from '../utils/schemas';

describe('Zod Schemas Validation', () => {
  describe('WidgetLayoutSchema', () => {
    it('should validate a correct layout object', () => {
      const widget = {
        id: crypto.randomUUID(),
        type: 'portfolio-summary',
        x: 0,
        y: 2,
        w: 4,
        h: 3,
        isCollapsed: false,
      };
      const result = WidgetLayoutSchema.safeParse(widget);
      expect(result.success).toBe(true);
    });

    it('should fail validation with negative coordinates or sizes', () => {
      const widget = {
        id: crypto.randomUUID(),
        type: 'portfolio-summary',
        x: -1,
        y: 2,
        w: 0,
        h: 3,
        isCollapsed: false,
      };
      const result = WidgetLayoutSchema.safeParse(widget);
      expect(result.success).toBe(false);
    });

    it('should reject prototype pollution attempts', () => {
      const payload = JSON.parse(
        '{"id":"11111111-1111-4111-a111-111111111111", "type":"portfolio-summary", "x":0, "y":0, "w":4, "h":3, "__proto__": {"polluted": true}}'
      );
      const result = WidgetLayoutSchema.safeParse(payload);
      if (result.success) {
        expect((result as any).data.polluted).toBeUndefined();
        expect(Object.getPrototypeOf((result as any).data)).not.toHaveProperty('polluted');
      } else {
        expect(result.success).toBe(false);
      }
    });
  });

  describe('TransactionSchema', () => {
    it('should validate a correct transaction', () => {
      const tx = {
        id: 'tx-1234',
        timestamp: Date.now(),
        symbol: 'AAPL',
        side: 'BUY',
        qty: 150,
        price: 172.5,
        status: 'COMPLETED',
      };
      const result = TransactionSchema.safeParse(tx);
      expect(result.success).toBe(true);
    });

    it('should reject invalid side or negative quantity', () => {
      const tx = {
        id: 'tx-1234',
        timestamp: Date.now(),
        symbol: 'AAPL',
        side: 'HOLD', // invalid side
        qty: -150, // invalid negative size
        price: 172.5,
        status: 'COMPLETED',
      };
      const result = TransactionSchema.safeParse(tx);
      expect(result.success).toBe(false);
    });
  });
});
