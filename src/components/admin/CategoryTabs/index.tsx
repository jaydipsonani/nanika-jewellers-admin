import styles from './CategoryTabs.module.scss';
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
            <div className={cn(styles.pillsContainer, className)}>
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => onChange(tab.value)}
                        className={cn(
                            styles.pillBtn,
                            value === tab.value ? styles.active : styles.inactive
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className={cn(styles.defaultContainer, className)}>
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    onClick={() => onChange(tab.value)}
                    className={cn(
                        styles.defaultBtn,
                        value == tab.value ? styles.active : styles.inactive
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
