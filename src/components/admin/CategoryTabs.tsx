import { cn } from '@/lib/utils';

interface Tab {
  value: string;
  label: string;
}

interface CategoryTabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  variant?: 'default' | 'pills';
}

export function CategoryTabs({ tabs, value, onChange, className, variant = 'default' }: CategoryTabsProps) {
  if (variant === 'pills') {
    return (
      <div className={cn('flex flex-wrap gap-2', className)}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium admin-transition',
              value === tab.value
                ? 'bg-foreground text-background'
                : 'bg-muted text-foreground hover:bg-muted-foreground/10'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex bg-muted rounded-lg p-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'flex-1 px-4 py-2.5 rounded-md text-sm font-medium admin-transition',
            value === tab.value
              ? 'bg-card text-foreground admin-shadow'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
