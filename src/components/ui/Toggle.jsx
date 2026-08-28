export const Toggle = ({
  checked,
  onChange,
  disabled = false,
  label,
  id = Math.random().toString(36).substring(2, 9)
}) => {
  return <label
    htmlFor={id}
    className={`inline-flex items-center select-none ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    style={{ gap: "0.5rem" }}
  >
      <div style={{ position: "relative" }}>
        <input
    type="checkbox"
    id={id}
    checked={checked}
    disabled={disabled}
    onChange={(e) => onChange(e.target.checked)}
    className="sr-only"
    style={{
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      border: "0"
    }}
    aria-checked={checked}
    role="switch"
  />
        <div
    className="rounded-full transition-colors"
    style={{
      width: "2.5rem",
      height: "1.25rem",
      backgroundColor: checked ? "var(--accent-color)" : "var(--scrollbar-thumb)",
      border: "1px solid var(--border-color)"
    }}
  />
        <div
    className="rounded-full bg-white transition-transform"
    style={{
      position: "absolute",
      top: "2px",
      left: "2px",
      width: "14px",
      height: "14px",
      transform: checked ? "translateX(1.25rem)" : "translateX(0)",
      boxShadow: "0 1px 2px rgba(0,0,0,0.2)"
    }}
  />
      </div>
      {label && <span className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </span>}
    </label>;
};
export default Toggle;
