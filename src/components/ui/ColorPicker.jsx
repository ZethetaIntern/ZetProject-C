import { useState, useEffect, useRef } from "react";
export const ColorPicker = ({
  color,
  onChange,
  presets = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#6366f1", "#06b6d4"],
  opacity = 1,
  onChangeOpacity,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hexInput, setHexInput] = useState(color);
  const ref = useRef(null);
  useEffect(() => {
    setHexInput(color);
  }, [color]);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  const handleInputChange = (e) => {
    const val = e.target.value;
    setHexInput(val);
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      onChange(val);
    }
  };
  return <div ref={ref} className={`relative inline-block ${className}`}>
      <div className="flex items-center gap-2">
        <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="w-8 h-8 rounded border border-[var(--border-color)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] cursor-pointer"
    style={{
      backgroundColor: color,
      opacity
    }}
    aria-label="Choose color"
  />
        <input
    type="text"
    value={hexInput}
    onChange={handleInputChange}
    className="w-20 px-2 py-1 text-xs bg-[var(--bg-card)] border border-[var(--border-color)] rounded text-[var(--text-primary)] font-mono"
  />
      </div>

      {isOpen && <div className="absolute left-0 z-[100] mt-1 p-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg shadow-xl w-48">
          <div className="text-xs font-semibold text-[var(--text-secondary)] mb-2 select-none">
            Presets
          </div>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {presets.map((p) => <button
    key={p}
    type="button"
    onClick={() => {
      onChange(p);
      setHexInput(p);
    }}
    className={`w-8 h-8 rounded border transition-transform hover:scale-105 cursor-pointer ${color === p ? "border-[var(--text-primary)] ring-1 ring-[var(--text-primary)]" : "border-[var(--border-color)]"}`}
    style={{ backgroundColor: p }}
    aria-label={`Select ${p}`}
  />)}
          </div>

          {onChangeOpacity && <div className="border-t border-[var(--border-color)] pt-3">
              <label className="text-xs font-semibold text-[var(--text-secondary)] flex justify-between select-none">
                <span>Opacity</span>
                <span className="font-mono">{Math.round(opacity * 100)}%</span>
              </label>
              <input
    type="range"
    min="0"
    max="1"
    step="0.05"
    value={opacity}
    onChange={(e) => onChangeOpacity(parseFloat(e.target.value))}
    className="w-full h-1 bg-[var(--bg-dashboard)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)] mt-2"
  />
            </div>}
        </div>}
    </div>;
};
export default ColorPicker;
