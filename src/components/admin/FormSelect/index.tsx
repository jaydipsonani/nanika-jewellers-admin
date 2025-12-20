import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FormSelect.module.scss';
import { cn } from '@/lib/utils';

interface Option {
    value: string;
    label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: Option[];
    placeholder?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
    ({ label, error, options, placeholder, className, id, ...props }, ref) => {
        const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className={styles.wrapper}>
                {label && (
                    <label htmlFor={selectId} className={styles.label}>
                        {label}
                    </label>
                )}
                <div className={styles.selectWrapper}>
                    <select
                        ref={ref}
                        id={selectId}
                        className={cn(
                            styles.select,
                            error && styles.error,
                            className
                        )}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className={styles.chevron} />
                </div>
                {error && <p className={styles.errorText}>{error}</p>}
            </div>
        );
    }
);

FormSelect.displayName = 'FormSelect';
