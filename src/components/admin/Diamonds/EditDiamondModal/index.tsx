import { Modal } from '@/components/admin/Modal';
import { DiamondForm } from '../DiamondForm';
import { Diamond } from '@/types/admin';

interface EditDiamondModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    diamond: Diamond | null;
    onSave: (data: any) => void;
}

export function EditDiamondModal({ open, onOpenChange, diamond, onSave }: EditDiamondModalProps) {
    // Map diamond to initialData
    // Need to fix types mapping if they differ.
    // Assuming basic mapping:
    const initialData = diamond ? {
        category: diamond.category as any, // type cast if needed
        shapes: [diamond.shape as any], // Single shape as array
        image: diamond.image,
        formData: {
            color: diamond.color,
            clarity: diamond.clarity as any,
            cut: 'Excellent', // Mock default
            carat: String(diamond.carat),
            cent: '0', // Mock default
            certificateNo: diamond.certificateNo,
            deliveryDays: '0', // Mock default
            price: String(diamond.price),
        }
    } : undefined;

    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title="Edit Diamond"
            size="large"
        >
            <div className="max-h-[70vh] overflow-y-auto">
                <DiamondForm
                    initialData={initialData as any} // Loose typing for mock
                    onSubmit={onSave}
                    isEdit
                />
            </div>
        </Modal>
    );
}
