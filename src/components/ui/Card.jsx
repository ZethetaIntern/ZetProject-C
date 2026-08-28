export const Card = ({
  children,
  title,
  headerActions,
  footer,
  isCollapsed = false,
  onToggleCollapse,
  dragHandleClass = "drag-handle",
  showBorder = true,
  className = "",
  ...props
}) => {
  return <div
    className={`bg-[var(--bg-card)] rounded-lg shadow-sm flex flex-col overflow-hidden transition-all duration-200 ${showBorder ? "border border-[var(--border-color)]" : ""} ${className}`}
    style={{ height: "100%", minHeight: "60px" }}
    {...props}
  >
      {
    /* Card Header */
  }
      {title && <div
    className={`px-4 py-2 border-b border-[var(--border-color)] bg-[var(--bg-header)] flex items-center justify-between no-select ${dragHandleClass}`}
  >
          <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)] tracking-wide uppercase">
            {title}
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            {headerActions}
            {onToggleCollapse && <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onToggleCollapse();
    }}
    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] focus:outline-none flex items-center justify-center"
    style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
    aria-label={isCollapsed ? "Expand card" : "Collapse card"}
  >
                <svg
    style={{
      width: "14px",
      height: "14px",
      transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)"
    }}
    className="transition-transform"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>}
          </div>
        </div>}

      {
    /* Card Body */
  }
      {!isCollapsed && <div className="p-4 flex-grow overflow-auto relative">
          {children}
        </div>}

      {
    /* Card Footer */
  }
      {!isCollapsed && footer && <div className="px-4 py-2 bg-[var(--bg-dashboard)]/60 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
          {footer}
        </div>}
    </div>;
};
export default Card;
