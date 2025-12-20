import { LucideIcon } from 'lucide-react';
import styles from './StatsCard.module.scss';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: { value: number; isPositive: boolean };
    className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
    return (
        <div className={cn(styles.card, className)}>
            <div className={styles.content}>
                <div>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.value}>{value}</p>
                    {trend && (
                        <p
                            className={cn(
                                styles.trend,
                                trend.isPositive ? styles.positive : styles.negative
                            )}
                        >
                            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}% from last month
                        </p>
                    )}
                </div>
                <div className={styles.iconWrapper}>
                    <Icon />
                </div>
            </div>
        </div>
    );
}
