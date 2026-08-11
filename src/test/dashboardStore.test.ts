import { describe, it, expect, beforeEach } from 'vitest';
import { useDashboardStore } from '../store/dashboardStore';

describe('Zustand Dashboard Store', () => {
  beforeEach(() => {
    // Reset store to default states before each test run
    const store = useDashboardStore.getState();
    store.logout();
    store.setTheme('dark');
    store.setEditing(false);
  });

  it('should initialize with default states', () => {
    const state = useDashboardStore.getState();
    expect(state.user).toBeNull();
    expect(state.isEditing).toBe(false);
    expect(state.theme).toBe('dark');
    expect(state.layout.length).toBeGreaterThan(0);
  });

  it('should handle login and logout successfully', () => {
    const store = useDashboardStore.getState();
    store.login('portfolio_mgr', 'Portfolio Manager');
    
    let state = useDashboardStore.getState();
    expect(state.user).not.toBeNull();
    expect(state.user?.username).toBe('portfolio_mgr');
    expect(state.user?.role).toBe('Portfolio Manager');

    store.logout();
    state = useDashboardStore.getState();
    expect(state.user).toBeNull();
  });

  it('should block layout editing mode for Viewers', () => {
    const store = useDashboardStore.getState();
    // Log in as Viewer
    store.login('viewer_user', 'Viewer');
    
    store.setEditing(true);
    const state = useDashboardStore.getState();
    expect(state.isEditing).toBe(false); // Locked to false for Viewers
  });

  it('should allow layout editing mode for Portfolio Managers', () => {
    const store = useDashboardStore.getState();
    // Log in as Portfolio Manager
    store.login('pm_user', 'Portfolio Manager');
    
    store.setEditing(true);
    const state = useDashboardStore.getState();
    expect(state.isEditing).toBe(true); // Allowed
  });

  it('should update active themes in local state', () => {
    const store = useDashboardStore.getState();
    store.setTheme('light');
    let state = useDashboardStore.getState();
    expect(state.theme).toBe('light');

    store.setTheme('high-contrast');
    state = useDashboardStore.getState();
    expect(state.theme).toBe('high-contrast');
  });

  it('should add widgets under PM authorization', () => {
    const store = useDashboardStore.getState();
    store.login('pm_user', 'Portfolio Manager');
    
    const initialCount = store.layout.length;
    store.addWidget('portfolio-summary');
    
    const state = useDashboardStore.getState();
    expect(state.layout.length).toBe(initialCount + 1);
  });

  it('should prevent adding widgets for Viewers', () => {
    const store = useDashboardStore.getState();
    store.login('viewer_user', 'Viewer');
    
    const initialCount = store.layout.length;
    store.addWidget('portfolio-summary');
    
    const state = useDashboardStore.getState();
    expect(state.layout.length).toBe(initialCount); // Unchanged
  });
});
