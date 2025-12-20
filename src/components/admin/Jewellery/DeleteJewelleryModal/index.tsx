import { Modal } from '@/components/admin/Modal';
import styles from './DeleteJewelleryModal.module.scss';

interface DeleteJewelleryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

export function DeleteJewelleryModal({ open, onOpenChange, onConfirm }: DeleteJewelleryModalProps) {
    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title="Delete Jewellery"
            description="Are you sure you want to delete this item? This action cannot be undone."
        >
            <div className={styles.actions}>
                <button
                    className={styles.cancelBtn}
                    onClick={() => onOpenChange(false)}
                >
                    Cancel
                </button>
                <button
                    className={styles.deleteBtn}
                    onClick={onConfirm}
                >
                    Delete
                </button>
            </div>
        </Modal>
    );
}
