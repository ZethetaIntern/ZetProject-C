import { describe, it, expect } from "vitest";
import { getWidget, listWidgets } from "../registry/widgetRegistry";
describe("Widget Registry Operations", () => {
  it("should retrieve a registered widget configuration", () => {
    const config = getWidget("portfolio-summary");
    expect(config).toBeDefined();
    expect(config?.name).toBe("Portfolio Summary");
    expect(config?.defaultWidth).toBe(6);
  });
  it("should return undefined for unregistered widget types", () => {
    const config = getWidget("non-existent-widget");
    expect(config).toBeUndefined();
  });
  it("should list all registered widgets", () => {
    const list = listWidgets();
    expect(list.length).toBeGreaterThanOrEqual(10);
    const types = list.map((w) => w.type);
    expect(types).toContain("portfolio-summary");
    expect(types).toContain("nav-performance");
    expect(types).toContain("var-gauges");
  });
});
