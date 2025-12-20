import { forwardRef } from 'react';
import styles from './FormInput.module.scss';
// Removed 'cn' as we are using pure css modules, but if we need to merge external classes we might keep it.
// Assuming we want to support external className prop to be appended.
import { cn } from '@/lib/utils'; // Keeping for appending external className

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, hint, className, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className={styles.wrapper}>
                {label && (
                    <label htmlFor={inputId} className={styles.label}>
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        styles.input,
                        error && styles.error,
                        className // Append external classes if needed (though avoiding tailwind)
                    )}
                    {...props}
                />
                {error && <p className={styles.errorText}>{error}</p>}
                {hint && !error && <p className={styles.hintText}>{hint}</p>}
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';
