import React, { useState, useEffect, useRef } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  group?: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string | string[];
  onChange: (value: any) => void;
  isMulti?: boolean;
  isSearchable?: boolean;
  placeholder?: string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  isMulti = false,
  isSearchable = false,
  placeholder = 'Select option...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (optionValue: string) => {
    if (isMulti) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter((v) => v !== optionValue));
      } else {
        onChange([...currentValues, optionValue]);
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const getSelectedLabel = () => {
    if (isMulti) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.length === 0) return placeholder;
      if (currentValues.length === 1) {
        return options.find((o) => o.value === currentValues[0])?.label || placeholder;
      }
      return `${currentValues.length} items selected`;
    } else {
      return options.find((o) => o.value === value)?.label || placeholder;
    }
  };

  // Filter options based on search
  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group options if applicable
  const groups: Record<string, DropdownOption[]> = {};
  const nonGrouped: DropdownOption[] = [];

  filteredOptions.forEach((o) => {
    if (o.group) {
      if (!groups[o.group]) groups[o.group] = [];
      groups[o.group].push(o);
    } else {
      nonGrouped.push(o);
    }
  });

  const isSelected = (val: string) => {
    if (isMulti) {
      return Array.isArray(value) && value.includes(val);
    }
    return value === val;
  };

  return (
    <div ref={ref} className={`relative min-w-[180px] ${className}`} style={{ userSelect: 'none' }}>
      <button
        type="button"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-3 py-1.5 text-sm bg-[var(--bg-card)] border border-[var(--border-color)] rounded text-left focus:outline-none focus:border-[var(--border-color-active)] cursor-pointer"
      >
        <span className="truncate text-[var(--text-primary)]">{getSelectedLabel()}</span>
        <svg
          style={{ width: '12px', height: '12px', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
          className="transition-transform text-[var(--text-muted)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded shadow-lg max-h-60 overflow-y-auto">
          {isSearchable && (
            <div className="p-2 border-b border-[var(--border-color)]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full px-2 py-1 text-xs bg-[var(--bg-dashboard)] border border-[var(--border-color)] rounded focus:outline-none focus:border-[var(--border-color-active)]"
              />
            </div>
          )}

          <ul role="listbox" className="py-1">
            {nonGrouped.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected(opt.value)}
                onClick={() => handleSelect(opt.value)}
                className="px-3 py-1.5 text-sm hover:bg-[var(--bg-dashboard)] flex items-center justify-between cursor-pointer text-[var(--text-primary)]"
              >
                <span>{opt.label}</span>
                {isSelected(opt.value) && (
                  <svg style={{ width: '14px', height: '14px', color: 'var(--accent-color)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </li>
            ))}

            {Object.keys(groups).map((groupName) => (
              <li key={groupName} className="list-none">
                <div className="px-3 py-1 text-xs font-bold text-[var(--text-muted)] bg-[var(--bg-dashboard)]/50 uppercase tracking-wider">
                  {groupName}
                </div>
                <ul>
                  {groups[groupName].map((opt) => (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected(opt.value)}
                      onClick={() => handleSelect(opt.value)}
                      className="pl-6 pr-3 py-1.5 text-sm hover:bg-[var(--bg-dashboard)] flex items-center justify-between cursor-pointer text-[var(--text-primary)]"
                    >
                      <span>{opt.label}</span>
                      {isSelected(opt.value) && (
                        <svg style={{ width: '14px', height: '14px', color: 'var(--accent-color)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}

            {filteredOptions.length === 0 && (
              <li className="px-3 py-3 text-sm text-[var(--text-muted)] text-center">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
