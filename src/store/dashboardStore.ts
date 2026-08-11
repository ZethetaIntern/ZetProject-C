import { create } from 'zustand';
import { DashboardLayoutSchema } from '../utils/schemas';

// Default layout with standard widgets arranged cleanly
const DEFAULT_LAYOUT = [
  { id: '11111111-1111-4111-a111-111111111111', type: 'portfolio-summary', x: 0, y: 0, w: 6, h: 4, isCollapsed: false },
  { id: '22222222-2222-4222-a222-222222222222', type: 'nav-performance', x: 6, y: 0, w: 6, h: 4, isCollapsed: false },
  { id: '33333333-3333-4333-a333-333333333333', type: 'var-gauges', x: 0, y: 4, w: 4, h: 3, isCollapsed: false },
  { id: '44444444-4444-4444-a444-444444444444', type: 'drawdown-analysis', x: 4, y: 4, w: 4, h: 3, isCollapsed: false },
  { id: '55555555-5555-4555-a555-555555555555', type: 'correlation-matrix', x: 8, y: 4, w: 4, h: 3, isCollapsed: false },
  { id: '66666666-6666-4666-a666-666666666666', type: 'brinson-attribution', x: 0, y: 7, w: 6, h: 4, isCollapsed: false },
  { id: '77777777-7777-4777-a777-777777777777', type: 'yield-curve', x: 6, y: 7, w: 6, h: 4, isCollapsed: false },
  { id: '88888888-8888-4888-a888-888888888888', type: 'risk-metrics', x: 0, y: 11, w: 4, h: 3, isCollapsed: false },
  { id: '99999999-9999-4999-a999-999999999999', type: 'sector-allocation', x: 4, y: 11, w: 4, h: 3, isCollapsed: false },
  { id: 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa', type: 'transaction-log', x: 8, y: 11, w: 4, h: 3, isCollapsed: false }
];

export interface WidgetInstance {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  isCollapsed: boolean;
}

export type ThemeType = 'light' | 'dark' | 'high-contrast';
export type UserRole = 'Portfolio Manager' | 'Viewer';

export interface UserSession {
  username: string;
  role: UserRole;
  loginTime: number;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface DashboardState {
  // Layout state
  layout: WidgetInstance[];
  isEditing: boolean;
  
  // Theme state
  theme: ThemeType;
  
  // Auth & Session
  user: UserSession | null;
  sessionTimeLeft: number; // in seconds (starts at 1800 for 30 mins)
  showSessionWarning: boolean;
  
  // Notifications
  toasts: ToastNotification[];
  
  // Widget-specific settings (e.g., benchmark selections, limit bounds)
  widgetSettings: Record<string, any>;
  
  // Actions
  login: (username: string, role: UserRole) => void;
  logout: () => void;
  setTheme: (theme: ThemeType) => void;
  setEditing: (editing: boolean) => void;
  updateLayouts: (newLayout: WidgetInstance[]) => void;
  addWidget: (type: string) => void;
  removeWidget: (id: string) => void;
  toggleWidgetCollapse: (id: string) => void;
  updateWidgetSettings: (id: string, settings: Record<string, any>) => void;
  addToast: (message: string, type: ToastNotification['type']) => void;
  removeToast: (id: string) => void;
  tickSession: () => void;
  resetLayout: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => {
  // Helper to load theme from environment/localStorage
  const getInitialTheme = (): ThemeType => {
    const saved = localStorage.getItem('meridian_theme') as ThemeType;
    if (saved === 'light' || saved === 'dark' || saved === 'high-contrast') return saved;
    const envDefault = import.meta.env.VITE_DEFAULT_THEME as ThemeType;
    return envDefault || 'dark';
  };

  // Helper to load layout with zod validation
  const getInitialLayout = (): WidgetInstance[] => {
    const saved = localStorage.getItem('meridian_layout');
    if (!saved) return DEFAULT_LAYOUT;
    try {
      const parsed = JSON.parse(saved);
      const validated = DashboardLayoutSchema.safeParse(parsed);
      if (validated.success) {
        return validated.data as WidgetInstance[];
      } else {
        console.error('Invalid layout JSON template configuration', validated.error);
        return DEFAULT_LAYOUT;
      }
    } catch {
      return DEFAULT_LAYOUT;
    }
  };

  // Set initial theme in document class/attributes
  const initialTheme = getInitialTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);

  return {
    layout: getInitialLayout(),
    isEditing: false,
    theme: initialTheme,
    user: JSON.parse(localStorage.getItem('meridian_session') || 'null'),
    sessionTimeLeft: 1800, // 30 minutes
    showSessionWarning: false,
    toasts: [],
    widgetSettings: JSON.parse(localStorage.getItem('meridian_widget_settings') || '{}'),

    login: (username, role) => {
      const session: UserSession = {
        username,
        role,
        loginTime: Date.now(),
      };
      localStorage.setItem('meridian_session', JSON.stringify(session));
      set({ user: session, sessionTimeLeft: 1800, showSessionWarning: false });
      get().addToast(`Welcome, ${username} (${role})`, 'success');
    },

    logout: () => {
      localStorage.removeItem('meridian_session');
      set({ user: null, sessionTimeLeft: 0, showSessionWarning: false, isEditing: false });
      get().addToast('Logged out successfully', 'info');
    },

    setTheme: (theme) => {
      localStorage.setItem('meridian_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      set({ theme });
    },

    setEditing: (editing) => {
      const { user } = get();
      if (user?.role !== 'Portfolio Manager') {
        get().addToast('Access denied: Viewers cannot customize layout', 'error');
        return;
      }
      set({ isEditing: editing });
    },

    updateLayouts: (newLayout) => {
      const { user } = get();
      if (user && user.role !== 'Portfolio Manager') return; // Read-only role guard
      
      // Keep serialized layout under 50KB boundary
      const serialized = JSON.stringify(newLayout);
      if (serialized.length > 50 * 1024) {
        get().addToast('Layout configuration exceeds storage limit of 50KB', 'error');
        return;
      }
      localStorage.setItem('meridian_layout', serialized);
      set({ layout: newLayout });
    },

    addWidget: (type) => {
      const { user, layout } = get();
      if (user?.role !== 'Portfolio Manager') {
        get().addToast('Access denied', 'error');
        return;
      }
      const maxWidgets = parseInt(import.meta.env.VITE_MAX_WIDGETS || '20', 10);
      if (layout.length >= maxWidgets) {
        get().addToast(`Maximum widget count of ${maxWidgets} reached`, 'warning');
        return;
      }

      // Generate random uuid (v4)
      const newId = crypto.randomUUID();
      // Position new widget at the bottom
      const maxY = layout.reduce((max, w) => Math.max(max, w.y + w.h), 0);
      const newWidget: WidgetInstance = {
        id: newId,
        type,
        x: 0,
        y: maxY,
        w: 4,
        h: 3,
        isCollapsed: false,
      };

      const updated = [...layout, newWidget];
      get().updateLayouts(updated);
      get().addToast(`Added widget: ${type}`, 'success');
    },

    removeWidget: (id) => {
      const { user, layout } = get();
      if (user?.role !== 'Portfolio Manager') {
        get().addToast('Access denied', 'error');
        return;
      }
      const updated = layout.filter((w) => w.id !== id);
      get().updateLayouts(updated);
      get().addToast('Widget removed', 'info');
    },

    toggleWidgetCollapse: (id) => {
      const { layout } = get();
      const updated = layout.map((w) => (w.id === id ? { ...w, isCollapsed: !w.isCollapsed } : w));
      get().updateLayouts(updated);
    },

    updateWidgetSettings: (id, settings) => {
      const { user, widgetSettings } = get();
      if (user?.role !== 'Portfolio Manager') {
        get().addToast('Access denied', 'error');
        return;
      }
      const updated = {
        ...widgetSettings,
        [id]: {
          ...(widgetSettings[id] || {}),
          ...settings,
        },
      };
      localStorage.setItem('meridian_widget_settings', JSON.stringify(updated));
      set({ widgetSettings: updated });
      get().addToast('Settings updated', 'success');
    },

    addToast: (message, type) => {
      const id = Math.random().toString(36).substring(2, 9);
      set((state) => ({
        toasts: [...state.toasts, { id, message, type }],
      }));
      // Auto dismiss after 5s
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, 5000);
    },

    removeToast: (id) => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    },

    tickSession: () => {
      const { user, sessionTimeLeft } = get();
      if (!user) return;

      if (sessionTimeLeft <= 1) {
        get().logout();
        get().addToast('Session expired due to inactivity', 'error');
      } else {
        const nextTime = sessionTimeLeft - 1;
        set({
          sessionTimeLeft: nextTime,
          showSessionWarning: nextTime <= 300, // Show warning in last 5 minutes
        });
      }
    },

    resetLayout: () => {
      const { user } = get();
      if (user?.role !== 'Portfolio Manager') return;
      localStorage.removeItem('meridian_layout');
      set({ layout: DEFAULT_LAYOUT });
      get().addToast('Dashboard layout reset to default', 'info');
    },
  };
});
