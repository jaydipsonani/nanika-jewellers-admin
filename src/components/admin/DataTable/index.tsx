import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './DataTable.module.scss';
import { cn } from '@/lib/utils';

interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (item: T) => React.ReactNode;
    className?: string; // We might need to handle this manually or via inline styles if it contains tailwind
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    className?: string;
}

export function DataTable<T extends { id: string }>({
    columns,
    data,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    className,
}: DataTableProps<T>) {
    return (
        <div className={cn(styles.container, className)}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    // If col.className has tailwind, it won't work. 
                                    // Ideally we map standardized classes or style objects. 
                                    // For now, we append it but expect it to be handled or removed.
                                    className={cn(col.className)}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className={styles.empty}>
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item.id}>
                                    {columns.map((col) => (
                                        <td
                                            key={`${item.id}-${String(col.key)}`}
                                            className={cn(col.className)}
                                        >
                                            {col.render
                                                ? col.render(item)
                                                : String((item as Record<string, unknown>)[col.key as string] ?? '')}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <p>
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className={styles.actions}>
                        <button
                            onClick={() => onPageChange?.(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={() => onPageChange?.(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
