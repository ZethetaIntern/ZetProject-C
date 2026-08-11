import React from 'react';
import { useDashboardStore, ToastNotification } from '../../store/dashboardStore';

export const ToastItem: React.FC<{ toast: ToastNotification }> = ({ toast }) => {
  const removeToast = useDashboardStore((state) => state.removeToast);

  const icons = {
    success: (
      <svg style={{ width: '16px', height: '16px', color: 'var(--color-up)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg style={{ width: '16px', height: '16px', color: 'var(--color-down)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    warning: (
      <svg style={{ width: '16px', height: '16px', color: 'var(--color-warning)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg style={{ width: '16px', height: '16px', color: 'var(--color-info)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const colors = {
    success: 'border-l-4 border-[var(--color-up)]',
    error: 'border-l-4 border-[var(--color-down)]',
    warning: 'border-l-4 border-[var(--color-warning)]',
    info: 'border-l-4 border-[var(--color-info)]',
  };

  return (
    <div
      role="alert"
      className={`flex items-center gap-3 px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded shadow-lg transition-all duration-300 transform translate-y-0 ${colors[toast.type]}`}
      style={{
        minWidth: '280px',
        maxWidth: '400px',
      }}
    >
      <div className="flex-shrink-0">{icons[toast.type]}</div>
      <p className="flex-grow text-sm font-medium text-[var(--text-primary)]">
        {toast.message}
      </p>
      <button
        type="button"
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
        style={{ background: 'none', border: 'none' }}
        aria-label="Dismiss notification"
      >
        <svg style={{ width: '14px', height: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const toasts = useDashboardStore((state) => state.toasts);

  return (
    <div
      className="fixed z-[9999] bottom-5 right-5 flex flex-col gap-2 pointer-events-none"
      style={{
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} />
        </div>
      ))}
    </div>
  );
};
