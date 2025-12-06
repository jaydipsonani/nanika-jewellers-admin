import { cn } from '@/lib/utils';

type Status = 'active' | 'hidden' | 'paid' | 'pending' | 'failed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusStyles: Record<Status, string> = {
  active: 'bg-success/10 text-success',
  hidden: 'bg-muted text-muted-foreground',
  paid: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  failed: 'bg-destructive/10 text-destructive',
  processing: 'bg-accent/10 text-accent',
  shipped: 'bg-accent/10 text-accent',
  delivered: 'bg-success/10 text-success',
  cancelled: 'bg-destructive/10 text-destructive',
};

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
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
