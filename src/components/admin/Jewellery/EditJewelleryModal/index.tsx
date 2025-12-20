import { Modal } from '@/components/admin/Modal';
import { JewelleryForm } from '../JewelleryForm';
import { Jewellery } from '@/types/admin';

interface EditJewelleryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    jewellery: Jewellery | null;
    onSave: (data: any) => void;
}

export function EditJewelleryModal({ open, onOpenChange, jewellery, onSave }: EditJewelleryModalProps) {
    // Transform jewellery data to form format if needed
    // For now assuming jewellery matches or we map it. 
    // We need to map Jewellery to initialData expected by JewelleryForm

    const initialData = jewellery ? {
        category: jewellery.category,
        image: jewellery.image,
        formData: {
            title: jewellery.title,
            description: "", // Mock data might not have descriptions
            metalType: jewellery.metalType,
            metalColor: jewellery.metalColor,
            ringSize: "12", // Mock default
            productWeight: String(jewellery.productWeight),
            grossWeight: String(jewellery.productWeight), // Mock assumption
            netWeight: String(jewellery.productWeight), // Mock assumption
        },
        diamonds: [ // Mock diamonds
            { id: '1', size: '', color: '', clarity: '', shape: '', noOfDiamonds: 0, totalWeight: 0 }
        ]
    } : undefined;

    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title="Edit Jewellery"
            size="large"
        >
            <JewelleryForm
                initialData={initialData}
                onSubmit={onSave}
                isEdit
            />
        </Modal>
    );
}
