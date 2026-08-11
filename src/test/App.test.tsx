import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { useDashboardStore } from '../store/dashboardStore';

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

describe('Main Application Layout Shell', () => {
  it('should render and handle core layout interactions', async () => {
    render(<App />);
    
    // Verify header title
    expect(screen.getByText('Meridian Capital')).toBeInTheDocument();
    
    // Verify connection state indicator exists and can be toggled
    const connBtn = screen.getByTitle(/WebSocket live/i);
    expect(connBtn).toBeInTheDocument();
    fireEvent.click(connBtn); // Toggles offline
    
    // Verify offline warning banner shows
    expect(screen.getByText(/CRITICAL WARNING: Live feeds disconnected/i)).toBeInTheDocument();
    
    // Toggle connection back online
    const reconnectBtn = screen.getByRole('button', { name: 'Reconnect' });
    fireEvent.click(reconnectBtn);

    // Toggle theme
    const lightThemeBtn = screen.getByRole('button', { name: 'light' });
    fireEvent.click(lightThemeBtn);
    expect(useDashboardStore.getState().theme).toBe('light');

    const darkThemeBtn = screen.getByRole('button', { name: 'dark' });
    fireEvent.click(darkThemeBtn);
    expect(useDashboardStore.getState().theme).toBe('dark');

    // Simulate Auth PM Login
    const nameInput = screen.getByPlaceholderText('User ID');
    fireEvent.change(nameInput, { target: { value: 'pm_tester' } });
    
    const roleSelect = screen.getByRole('combobox');
    fireEvent.change(roleSelect, { target: { value: 'Portfolio Manager' } });

    const loginBtn = screen.getByRole('button', { name: 'Login' });
    fireEvent.submit(loginBtn.closest('form')!);

    // Verify logged in state
    expect(screen.getByText('pm_tester')).toBeInTheDocument();
    expect(screen.getByText('Portfolio Manager')).toBeInTheDocument();

    // Verify layout edit options show for PM
    expect(screen.getByRole('button', { name: 'Edit Layout' })).toBeInTheDocument();

    // Simulate Logout
    const exitBtn = screen.getByRole('button', { name: 'Exit' });
    fireEvent.click(exitBtn);

    // Verify logged out state
    expect(screen.queryByText('pm_tester')).not.toBeInTheDocument();
  });
});
