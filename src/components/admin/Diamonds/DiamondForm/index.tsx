import { useState, useEffect } from 'react';
import { CategoryTabs } from '@/components/admin/CategoryTabs';
import { ShapeSelector } from '@/components/admin/ShapeSelector';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { FormInput } from '@/components/admin/FormInput';
import { FormSelect } from '@/components/admin/FormSelect';
import { Button } from '@/components/admin/Button';
import { DiamondCategory, DiamondShape, Clarity, Cut } from '@/types/admin';
import { Eye, Plus } from 'lucide-react';
import styles from './DiamondForm.module.scss';

const categoryTabs = [
    { value: 'natural', label: 'Natural' },
    { value: 'lab-grown', label: 'Lab Grown / HPHT' },
];

const clarityOptions = [
    { value: 'IF', label: 'IF' },
    { value: 'VVS1', label: 'VVS1' },
    { value: 'VVS2', label: 'VVS2' },
    { value: 'VS1', label: 'VS1' },
    { value: 'VS2', label: 'VS2' },
    { value: 'SI1', label: 'SI1' },
    { value: 'SI2', label: 'SI2' },
];

const cutOptions = [
    { value: 'Excellent', label: 'Excellent' },
    { value: 'Very Good', label: 'Very Good' },
    { value: 'Good', label: 'Good' },
];

export interface DiamondFormData {
    color: string;
    clarity: Clarity | '';
    cut: Cut | '';
    carat: string;
    cent: string;
    certificateNo: string;
    deliveryDays: string;
    price: string;
}

interface DiamondFormProps {
    initialData?: {
        category: DiamondCategory;
        shapes: DiamondShape[];
        image?: string;
        formData: DiamondFormData;
    };
    onSubmit: (data: any) => void;
    isEdit?: boolean;
}

export function DiamondForm({ initialData, onSubmit, isEdit = false }: DiamondFormProps) {
    const [category, setCategory] = useState<DiamondCategory>('natural');
    const [selectedShapes, setSelectedShapes] = useState<DiamondShape[]>([]);
    const [image, setImage] = useState<string>();
    const [formData, setFormData] = useState<DiamondFormData>({
        color: '',
        clarity: '',
        cut: '',
        carat: '',
        cent: '',
        certificateNo: '',
        deliveryDays: '',
        price: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setCategory(initialData.category);
            setSelectedShapes(initialData.shapes);
            setImage(initialData.image);
            setFormData(initialData.formData);
        }
    }, [initialData]);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (selectedShapes.length === 0) newErrors.shapes = 'Select at least one shape';
        if (!formData.color) newErrors.color = 'Color is required';
        if (!formData.clarity) newErrors.clarity = 'Clarity is required';
        if (!formData.cut) newErrors.cut = 'Cut is required';
        if (!formData.carat || parseFloat(formData.carat) <= 0) newErrors.carat = 'Valid carat required';
        if (!formData.certificateNo) newErrors.certificateNo = 'Certificate number is required';
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) {
            return;
        }

        onSubmit({
            category,
            shapes: selectedShapes,
            image,
            ...formData,
        });
    };

    return (
        <div className={styles.formContainer}>

            {/* Category Toggle */}
            <div className={styles.section}>
                <h3>Category</h3>
                <CategoryTabs
                    tabs={categoryTabs}
                    value={category}
                    onChange={(v) => setCategory(v as DiamondCategory)}
                    className="max-w-md"
                />
            </div>

            {/* Shape Selection */}
            <div className={styles.section}>
                <h3>
                    Shapes <span className={styles.subText}>(select one)</span>
                    {/* User asked for single select, so updating text */}
                </h3>
                {/* Pass multiple={false} for single select */}
                <ShapeSelector value={selectedShapes} onChange={setSelectedShapes} multiple={false} />
                {errors.shapes && <p className={styles.errorText}>{errors.shapes}</p>}
            </div>

            {/* Diamond Details */}
            <div className={styles.section}>
                <h3>Diamond Details</h3>

                <div className={styles.gridCols3}>
                    {/* Image Upload */}
                    <div>
                        <ImageUpload value={image} onChange={setImage} className="max-w-[240px]" />
                    </div>

                    {/* Form Fields */}
                    <div className={`${styles.colSpan2} ${styles.formGrid}`}>
                        <FormInput
                            label="Color"
                            placeholder="e.g., D, E, F"
                            value={formData.color}
                            onChange={(e) => handleInputChange('color', e.target.value)}
                            error={errors.color}
                        />
                        <FormSelect
                            label="Clarity"
                            options={clarityOptions}
                            placeholder="Select clarity"
                            value={formData.clarity}
                            onChange={(e) => handleInputChange('clarity', e.target.value)}
                            error={errors.clarity}
                        />
                        <FormSelect
                            label="Cut"
                            options={cutOptions}
                            placeholder="Select cut"
                            value={formData.cut}
                            onChange={(e) => handleInputChange('cut', e.target.value)}
                            error={errors.cut}
                        />
                        <FormInput
                            label="Carat"
                            type="number"
                            placeholder="0.00"
                            step="0.01"
                            value={formData.carat}
                            onChange={(e) => handleInputChange('carat', e.target.value)}
                            error={errors.carat}
                        />
                        <FormInput
                            label="Cent"
                            type="number"
                            placeholder="0"
                            value={formData.cent}
                            onChange={(e) => handleInputChange('cent', e.target.value)}
                        />
                        <FormInput
                            label="Certificate No."
                            placeholder="e.g., GIA-123456"
                            value={formData.certificateNo}
                            onChange={(e) => handleInputChange('certificateNo', e.target.value)}
                            error={errors.certificateNo}
                        />
                        <FormInput
                            label="Get it within"
                            type="number"
                            placeholder="Days"
                            value={formData.deliveryDays}
                            onChange={(e) => handleInputChange('deliveryDays', e.target.value)}
                            hint="Delivery days"
                        />
                        <FormInput
                            label="Price (₹)"
                            type="number"
                            placeholder="0"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            error={errors.price}
                            className={styles.fullWidth}
                        />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <Button
                    variant="outline"
                    onClick={() => { }} // Preview placeholder
                    className="flex-1"
                >
                    <Eye size={16} />
                    Preview
                </Button>
                <Button variant="admin" onClick={handleSubmit} className="flex-1" size="lg">
                    <Plus size={16} />
                    {isEdit ? 'Update Item' : 'Add Item'}
                </Button>
            </div>
        </div>
    );
}
