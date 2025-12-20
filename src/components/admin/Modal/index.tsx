import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import styles from './Modal.module.scss';
import { cn } from '@/lib/utils';

interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    size?: 'default' | 'large';
    className?: string;
}

export function Modal({
    open,
    onOpenChange,
    title,
    description,
    children,
    size = 'default',
    className
}: ModalProps) {
    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className={styles.overlay} />
                <DialogPrimitive.Content
                    className={cn(
                        styles.content,
                        size === 'large' && styles.large,
                        className
                    )}
                >
                    {title && <DialogPrimitive.Title className={styles.title}>{title}</DialogPrimitive.Title>}
                    {description && <DialogPrimitive.Description className={styles.description}>{description}</DialogPrimitive.Description>}

                    {children}

                    <DialogPrimitive.Close className={styles.closeBtn}>
                        <X size={18} />
                    </DialogPrimitive.Close>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
