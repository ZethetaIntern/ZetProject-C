import { useState } from "react";
export const Tooltip = ({
  content,
  children,
  position = "top",
  className = ""
}) => {
  const [active, setActive] = useState(false);
  const getPositionStyles = () => {
    switch (position) {
      case "bottom":
        return {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%) translateY(6px)"
        };
      case "left":
        return {
          top: "50%",
          right: "100%",
          transform: "translateY(-50%) translateX(-6px)"
        };
      case "right":
        return {
          top: "50%",
          left: "100%",
          transform: "translateY(-50%) translateX(6px)"
        };
      case "top":
      default:
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%) translateY(-6px)"
        };
    }
  };
  return <div
    className={`relative inline-block ${className}`}
    onMouseEnter={() => setActive(true)}
    onMouseLeave={() => setActive(false)}
    onFocus={() => setActive(true)}
    onBlur={() => setActive(false)}
  >
      {children}
      {active && <div
    role="tooltip"
    className="absolute z-[999] px-2 py-1 text-xs font-normal text-white bg-black border border-[var(--border-color)] rounded shadow-md pointer-events-none select-none max-w-xs text-center"
    style={{
      ...getPositionStyles(),
      whiteSpace: "nowrap"
    }}
  >
          {content}
        </div>}
    </div>;
};
export default Tooltip;
