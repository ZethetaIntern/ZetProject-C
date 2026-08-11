import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  className = '',
}) => {
  return (
    <div
      className={`border-b border-[var(--border-color)] overflow-x-auto scrollbar-none flex ${className}`}
      style={{ whiteSpace: 'nowrap' }}
      role="tablist"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className="px-4 py-2 border-b-2 font-medium text-sm flex items-center gap-1.5 transition-colors focus:outline-none"
            style={{
              borderColor: isActive ? 'var(--accent-color)' : 'transparent',
              color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
              cursor: 'pointer',
              background: 'none',
            }}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
