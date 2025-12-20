import { useState, useEffect } from 'react';
import { CategoryTabs } from '@/components/admin/CategoryTabs';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { FormInput } from '@/components/admin/FormInput';
import { FormSelect } from '@/components/admin/FormSelect';
import { JewelleryCategory, DiamondDetail } from '@/types/admin';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';
import styles from './JewelleryForm.module.scss';
import { cn } from '@/lib/utils'; // For button variants if needed or replacement

// ... imports and options ...
const categoryTabs = [
    { value: 'ring', label: 'Ring' },
    { value: 'earring', label: 'Earring' },
    { value: 'pendant', label: 'Pendant' },
    { value: 'bracelet', label: 'Bracelet' },
    { value: 'necklace', label: 'Necklace' },
    { value: 'watch', label: 'Watch' },
];

const metalTypeOptions = [
    { value: '9K', label: '9K Gold' },
    { value: '14K', label: '14K Gold' },
    { value: '18K', label: '18K Gold' },
];

const metalColorOptions = [
    { value: 'gold', label: 'Gold' },
    { value: 'rose-gold', label: 'Rose Gold' },
    { value: 'silver', label: 'Silver' },
];

const ringSizeOptions = Array.from({ length: 21 }, (_, i) => ({
    value: String(i + 5),
    label: String(i + 5),
}));

export interface JewelleryFormData {
    title: string;
    description: string;
    metalType: string;
    metalColor: string;
    ringSize: string;
    productWeight: string;
    grossWeight: string;
    netWeight: string;
}

interface JewelleryFormProps {
    initialData?: {
        category: JewelleryCategory;
        image?: string;
        formData: JewelleryFormData;
        diamonds: DiamondDetail[];
    };
    onSubmit: (data: any) => void;
    isEdit?: boolean;
}

export function JewelleryForm({ initialData, onSubmit, isEdit = false }: JewelleryFormProps) {
    const [category, setCategory] = useState<JewelleryCategory>('ring');
    const [image, setImage] = useState<string>();
    const [formData, setFormData] = useState<JewelleryFormData>({
        title: '',
        description: '',
        metalType: '',
        metalColor: '',
        ringSize: '',
        productWeight: '',
        grossWeight: '',
        netWeight: '',
    });
    const [diamonds, setDiamonds] = useState<DiamondDetail[]>([
        { id: '1', size: '', color: '', clarity: '', shape: '', noOfDiamonds: 0, totalWeight: 0 },
    ]);

    useEffect(() => {
        if (initialData) {
            setCategory(initialData.category);
            setImage(initialData.image);
            setFormData(initialData.formData);
            setDiamonds(initialData.diamonds);
        }
    }, [initialData]);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleDiamondChange = (index: number, field: keyof DiamondDetail, value: string | number) => {
        setDiamonds((prev) =>
            prev.map((d, i) => (i === index ? { ...d, [field]: value } : d))
        );
    };

    const addDiamondRow = () => {
        setDiamonds((prev) => [
            ...prev,
            { id: String(Date.now()), size: '', color: '', clarity: '', shape: '', noOfDiamonds: 0, totalWeight: 0 },
        ]);
    };

    const removeDiamondRow = (index: number) => {
        if (diamonds.length > 1) {
            setDiamonds((prev) => prev.filter((_, i) => i !== index));
        }
    };

    const totalDiamondWeight = diamonds.reduce((sum, d) => sum + (d.totalWeight || 0), 0);
    const estimatedPrice = 192611; // Placeholder calculation

    const handleSubmit = () => {
        const data = {
            category,
            image,
            ...formData,
            diamonds,
        };
        onSubmit(data);
    };

    return (
        <div className={styles.formContainer}>

            {/* Category Tabs */}
            <div className={styles.section}>
                <CategoryTabs
                    tabs={categoryTabs}
                    value={category}
                    onChange={(v) => setCategory(v as JewelleryCategory)}
                    variant="pills"
                />
            </div>

            <div className={styles.gridCols3}>
                {/* Left Column - Image */}
                <div className={styles.section}>
                    <h3>Product Image</h3>
                    <ImageUpload value={image} onChange={setImage} />
                </div>

                {/* Right Column - Details */}
                <div className={styles.colSpan2}>
                    {/* Product Details */}
                    <div className={styles.section}>
                        <h3>Product Details</h3>
                        <div className={styles.formGrid}>
                            <FormInput
                                label="Title"
                                placeholder="e.g., Emerald Glow Solitaire Ring"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className={styles.fullWidth}
                            />
                            <FormInput
                                label="Description"
                                placeholder="Product description..."
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className={styles.fullWidth}
                            />
                            <FormSelect
                                label="Metal Type"
                                options={metalTypeOptions}
                                placeholder="Select metal"
                                value={formData.metalType}
                                onChange={(e) => handleInputChange('metalType', e.target.value)}
                            />
                            <FormSelect
                                label="Metal Color"
                                options={metalColorOptions}
                                placeholder="Select color"
                                value={formData.metalColor}
                                onChange={(e) => handleInputChange('metalColor', e.target.value)}
                            />
                            {category === 'ring' && (
                                <FormSelect
                                    label="Ring Size"
                                    options={ringSizeOptions}
                                    placeholder="Select size"
                                    value={formData.ringSize}
                                    onChange={(e) => handleInputChange('ringSize', e.target.value)}
                                />
                            )}
                            <FormInput
                                label="Product Weight (g)"
                                type="number"
                                placeholder="0.00"
                                step="0.001"
                                value={formData.productWeight}
                                onChange={(e) => handleInputChange('productWeight', e.target.value)}
                            />
                            <FormInput
                                label="Gross Weight (g)"
                                type="number"
                                placeholder="0.00"
                                step="0.001"
                                value={formData.grossWeight}
                                onChange={(e) => handleInputChange('grossWeight', e.target.value)}
                            />
                            <FormInput
                                label="Net Weight (g)"
                                type="number"
                                placeholder="0.00"
                                step="0.001"
                                value={formData.netWeight}
                                onChange={(e) => handleInputChange('netWeight', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Diamond Details Table */}
                    <div className={styles.section}>
                        <div className={styles.diamondHeader}>
                            <h3>Diamond & Gemstones</h3>
                            <button className={styles.addRowBtn} onClick={addDiamondRow}>
                                <Plus size={12} />
                                Add Row
                            </button>
                        </div>

                        <div className={styles.tableWrapper}>
                            <table className={styles.diamondTable}>
                                <thead>
                                    <tr>
                                        <th>Size</th>
                                        <th>Color</th>
                                        <th>Clarity</th>
                                        <th>Shape</th>
                                        <th>No.</th>
                                        <th>Weight</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {diamonds.map((diamond, index) => (
                                        <tr key={diamond.id}>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="0.08-0.17"
                                                    value={diamond.size}
                                                    onChange={(e) => handleDiamondChange(index, 'size', e.target.value)}
                                                    className={styles.wMedium}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="EF"
                                                    value={diamond.color}
                                                    onChange={(e) => handleDiamondChange(index, 'color', e.target.value)}
                                                    className={styles.wSmall}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="VVS/VS"
                                                    value={diamond.clarity}
                                                    onChange={(e) => handleDiamondChange(index, 'clarity', e.target.value)}
                                                    className={styles.wMedium}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Tapper"
                                                    value={diamond.shape}
                                                    onChange={(e) => handleDiamondChange(index, 'shape', e.target.value)}
                                                    className={styles.wMedium}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={diamond.noOfDiamonds || ''}
                                                    onChange={(e) => handleDiamondChange(index, 'noOfDiamonds', parseInt(e.target.value) || 0)}
                                                    className={styles.wSmall}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    placeholder="0.00"
                                                    step="0.001"
                                                    value={diamond.totalWeight || ''}
                                                    onChange={(e) => handleDiamondChange(index, 'totalWeight', parseFloat(e.target.value) || 0)}
                                                    className={styles.wMedium}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => removeDiamondRow(index)}
                                                    disabled={diamonds.length === 1}
                                                    className={styles.removeBtn}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={5} style={{ textAlign: 'right', fontWeight: 500, paddingRight: '12px' }}>
                                            Total Weight:
                                        </td>
                                        <td style={{ fontWeight: 500, padding: '8px' }}>{totalDiamondWeight.toFixed(3)}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Price Display */}
                    <div className={styles.priceDisplay}>
                        <p className={styles.label}>Estimated Price</p>
                        <p className={styles.price}>
                            ₹{estimatedPrice.toLocaleString()}/-
                        </p>
                        <p className={styles.note}>
                            This is an estimated price, actual price may differ as per actual weights.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button onClick={handleSubmit} className={styles.submitBtn}>
                        <Plus size={16} />
                        {isEdit ? 'Update Jewellery' : 'Add Jewellery'}
                    </button>
                </div>
            </div>
        </div>
    );
}
