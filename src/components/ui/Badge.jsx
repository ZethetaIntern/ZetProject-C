export const Badge = ({
  children,
  variant = "neutral",
  onRemove,
  count,
  className = ""
}) => {
  const variantStyles = {
    success: "bg-[var(--color-up-bg)] text-[var(--color-up)] border border-[var(--color-up)]",
    danger: "bg-[var(--color-down-bg)] text-[var(--color-down)] border border-[var(--color-down)]",
    warning: "bg-[var(--color-warning-bg)] text-[var(--color-warning)] border border-[var(--color-warning)]",
    info: "bg-[var(--color-info-bg)] text-[var(--color-info)] border border-[var(--color-info)]",
    neutral: "bg-[var(--bg-dashboard)] text-[var(--text-secondary)] border border-[var(--border-color)]"
  };
  return <span
    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold select-none ${variantStyles[variant]} ${className}`}
    style={{ gap: "0.375rem", height: "1.5rem", whiteSpace: "nowrap" }}
  >
      {children}
      {count !== void 0 && <span
    className="ml-1 rounded-full bg-[var(--text-primary)] text-[var(--bg-card)] flex items-center justify-center font-bold"
    style={{ minWidth: "1rem", height: "1rem", fontSize: "10px", padding: "0 4px" }}
  >
          {count}
        </span>}
      {onRemove && <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onRemove();
    }}
    className="ml-1 text-current hover:opacity-80 focus:outline-none flex items-center justify-center"
    aria-label="Remove badge"
    style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
  >
          <svg style={{ width: "12px", height: "12px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>}
    </span>;
};
export default Badge;
