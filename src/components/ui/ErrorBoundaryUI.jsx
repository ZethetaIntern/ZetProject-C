import { useState } from "react";
import Button from "./Button";
export const ErrorBoundaryUI = ({
  error,
  resetError,
  variant = "widget"
}) => {
  const [showStack, setShowStack] = useState(false);
  const getVariantStyles = () => {
    switch (variant) {
      case "page":
        return {
          wrapperClass: "min-h-[100vh] w-full flex items-center justify-center p-8 bg-[var(--bg-dashboard)] text-[var(--text-primary)]",
          containerClass: "w-full max-w-xl p-8 bg-[var(--bg-card)] border border-[var(--color-down)] rounded-lg shadow-2xl flex flex-col gap-5",
          title: "System Level Crash",
          desc: "Meridian Capital dashboard encountered a global error. The error has been logged."
        };
      case "network":
        return {
          wrapperClass: "h-full w-full flex items-center justify-center p-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg text-center",
          containerClass: "flex flex-col items-center gap-3 max-w-sm",
          title: "Network Sync Failure",
          desc: "Real-time WebSocket connection was interrupted. Falling back to cached data feed."
        };
      case "widget":
      default:
        return {
          wrapperClass: "h-full w-full flex items-center justify-center p-4 bg-[var(--bg-card)] border border-[var(--color-down)]/40 rounded-lg text-center",
          containerClass: "flex flex-col items-center gap-3 max-w-xs",
          title: "Widget Load Failure",
          desc: "An error occurred during widget rendering."
        };
    }
  };
  const style = getVariantStyles();
  return <div className={style.wrapperClass}>
      <div className={style.containerClass}>
        <div className="flex items-center justify-center gap-3">
          <svg style={{ width: "28px", height: "28px", color: "var(--color-down)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">{style.title}</h2>
        </div>

        <p className="text-sm text-[var(--text-secondary)]">{style.desc}</p>
        
        <div className="p-3 bg-[var(--bg-dashboard)] rounded border border-[var(--border-color)] text-xs text-left font-mono text-[var(--color-down)] max-w-full overflow-x-auto select-all">
          {error.message || "Unknown Exception"}
        </div>

        {variant === "page" && error.stack && <div className="text-left w-full border-t border-[var(--border-color)] pt-3">
            <button
    onClick={() => setShowStack(!showStack)}
    className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-color)] cursor-pointer"
    style={{ background: "none", border: "none" }}
  >
              {showStack ? "Hide technical details" : "Show technical details"}
            </button>
            {showStack && <pre className="mt-2 p-3 bg-[var(--bg-dashboard)] rounded text-[10px] text-[var(--text-secondary)] overflow-x-auto max-h-40 leading-relaxed font-mono">
                {error.stack}
              </pre>}
          </div>}

        <div className="mt-2 flex items-center justify-center gap-3">
          <Button variant="primary" size="sm" onClick={resetError}>
            {variant === "page" ? "Reload Dashboard" : "Retry Rendering"}
          </Button>
        </div>
      </div>
    </div>;
};
export default ErrorBoundaryUI;
