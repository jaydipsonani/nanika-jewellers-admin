import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.scss';
import { cn } from '@/lib/utils'; // For generic className support

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'admin';
    size?: 'default' | 'sm' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
        // Map variants. 'admin' maps to 'primary' style in SCSS or we can have specific .admin class
        // in SCSS I mapped .admin to .primary style block.

        return (
            <button
                ref={ref}
                className={cn(
                    styles.btn,
                    styles[variant], // e.g. styles.primary
                    styles[size],    // e.g. styles.sm
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
