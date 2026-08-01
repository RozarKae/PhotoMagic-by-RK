import * as React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div
      className={`flex items-center gap-2 border-b border-border-subtle overflow-x-auto ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 font-nav text-[10px] uppercase tracking-widest font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              isActive
                ? 'border-gold-500 text-gold-400'
                : 'border-transparent text-silver hover:text-ivory hover:border-border-subtle'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold transition-colors ${
                  isActive
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                    : 'bg-surface-elevated text-silver/70 border border-border-subtle/40'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
