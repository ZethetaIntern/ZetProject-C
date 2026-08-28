import { useState, useEffect, useRef } from "react";
export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  suggestions = [],
  onSelectSuggestion,
  debounceMs = 300,
  className = ""
}) => {
  const [innerVal, setInnerVal] = useState(value);
  const [showSuggest, setShowSuggest] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(innerVal);
    }, debounceMs);
    return () => clearTimeout(handler);
  }, [innerVal, debounceMs, onChange]);
  useEffect(() => {
    setInnerVal(value);
  }, [value]);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowSuggest(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  const filteredSuggestions = suggestions.filter(
    (item) => item.toLowerCase().includes(innerVal.toLowerCase())
  );
  return <div ref={ref} className={`relative flex items-center ${className}`}>
      <input
    type="text"
    value={innerVal}
    placeholder={placeholder}
    onChange={(e) => {
      setInnerVal(e.target.value);
      setShowSuggest(true);
    }}
    onFocus={() => setShowSuggest(true)}
    className="w-full px-3 py-1.5 text-sm bg-[var(--bg-card)] border border-[var(--border-color)] rounded focus:outline-none focus:border-[var(--border-color-active)]"
  />
      {innerVal && <button
    type="button"
    onClick={() => {
      setInnerVal("");
      onChange("");
      setShowSuggest(false);
    }}
    className="absolute right-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
    style={{ background: "none", border: "none" }}
    aria-label="Clear search"
  >
          <svg style={{ width: "14px", height: "14px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>}
      {showSuggest && innerVal && filteredSuggestions.length > 0 && <ul
    className="absolute left-0 right-0 z-50 top-full mt-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded shadow-lg max-h-40 overflow-y-auto"
    role="listbox"
  >
          {filteredSuggestions.map((item, idx) => <li
    key={idx}
    role="option"
    aria-selected={item === innerVal}
    onClick={() => {
      setInnerVal(item);
      onChange(item);
      if (onSelectSuggestion) onSelectSuggestion(item);
      setShowSuggest(false);
    }}
    className="px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-dashboard)] cursor-pointer"
  >
              {item}
            </li>)}
        </ul>}
    </div>;
};
export default SearchInput;
