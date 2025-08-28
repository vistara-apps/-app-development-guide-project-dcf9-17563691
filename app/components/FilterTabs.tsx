"use client";

interface FilterTabsProps {
  activeFilter: 'all' | 'rekt' | 'rich';
  onFilterChange: (filter: 'all' | 'rekt' | 'rich') => void;
}

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="flex space-x-1 bg-surface rounded-lg p-1 border border-text-secondary/10">
      <button
        onClick={() => onFilterChange('all')}
        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeFilter === 'all'
            ? 'bg-primary text-white'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        All Stories
      </button>
      <button
        onClick={() => onFilterChange('rekt')}
        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeFilter === 'rekt'
            ? 'bg-rekt text-white'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        💸 Rekt
      </button>
      <button
        onClick={() => onFilterChange('rich')}
        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeFilter === 'rich'
            ? 'bg-rich text-white'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        💰 Rich
      </button>
    </div>
  );
}
