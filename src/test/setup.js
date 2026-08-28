import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));
if (!global.crypto.randomUUID) {
  Object.defineProperty(global.crypto, "randomUUID", {
    value: vi.fn().mockImplementation(() => "11111111-1111-4111-a111-111111111111"),
    writable: true
  });
}
afterEach(() => {
  cleanup();
});
