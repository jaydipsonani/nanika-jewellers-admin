import { Modal } from '@/components/admin/Modal';
import { Button } from '@/components/admin/Button';
import styles from './DeleteDiamondModal.module.scss'; // Reuse styles or create new

interface DeleteDiamondModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

export function DeleteDiamondModal({ open, onOpenChange, onConfirm }: DeleteDiamondModalProps) {
    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title="Delete Diamond"
            description="Are you sure you want to delete this diamond? This action cannot be undone."
        >
            <div className={styles.actions}>
                <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                >
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={onConfirm}
                >
                    Delete
                </Button>
            </div>
        </Modal>
    );
}
