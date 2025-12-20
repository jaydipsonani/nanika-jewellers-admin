import styles from './StatusBadge.module.scss';
import { cn } from '@/lib/utils';

type Status = 'active' | 'hidden' | 'paid' | 'pending' | 'failed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface StatusBadgeProps {
    status: Status;
    className?: string; // Allowing external class injection
}

const statusLabels: Record<Status, string> = {
    active: 'Active',
    hidden: 'Hidden',
    paid: 'Paid',
    pending: 'Pending',
    failed: 'Failed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    // Map status to style class
    // e.g. status 'active' -> styles.active
    const statusClass = styles[status] || styles.secondary;

    return (
        <span
            className={cn(
                styles.badge,
                statusClass,
                className
            )}
        >
            {statusLabels[status]}
        </span>
    );
}
