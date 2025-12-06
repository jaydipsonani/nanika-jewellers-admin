import { useState } from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { CategoryTabs } from '@/components/admin/CategoryTabs';
import { ShapeSelector } from '@/components/admin/ShapeSelector';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { FormInput } from '@/components/admin/FormInput';
import { FormSelect } from '@/components/admin/FormSelect';
import { Button } from '@/components/ui/button';
import { DiamondCategory, DiamondShape, Clarity, Cut } from '@/types/admin';
import { toast } from '@/hooks/use-toast';
import { Eye, Plus } from 'lucide-react';

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

export default function AddDiamond() {
  const [category, setCategory] = useState<DiamondCategory>('natural');
  const [selectedShapes, setSelectedShapes] = useState<DiamondShape[]>([]);
  const [image, setImage] = useState<string>();
  const [formData, setFormData] = useState({
    color: '',
    clarity: '' as Clarity | '',
    cut: '' as Cut | '',
    carat: '',
    cent: '',
    certificateNo: '',
    deliveryDays: '',
    price: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

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
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    // API placeholder
    console.log('Submitting diamond:', {
      category,
      shapes: selectedShapes,
      image,
      ...formData,
    });

    toast({
      title: 'Diamond Added',
      description: 'The diamond has been successfully added to inventory.',
    });
  };

  return (
    <div className="animate-fade-in max-w-4xl">
      <PageHeader
        title="Add Diamond"
        description="Add a new diamond to your inventory"
      />

      {/* Category Toggle */}
      <div className="bg-card rounded-lg p-6 admin-shadow mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Category</h3>
        <CategoryTabs
          tabs={categoryTabs}
          value={category}
          onChange={(v) => setCategory(v as DiamondCategory)}
          className="max-w-md"
        />
      </div>

      {/* Shape Selection */}
      <div className="bg-card rounded-lg p-6 admin-shadow mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Shapes <span className="text-muted-foreground/60">(select multiple)</span>
        </h3>
        <ShapeSelector value={selectedShapes} onChange={setSelectedShapes} />
        {errors.shapes && <p className="text-xs text-destructive mt-2">{errors.shapes}</p>}
      </div>

      {/* Diamond Details */}
      <div className="bg-card rounded-lg p-6 admin-shadow mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Diamond Details</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Upload */}
          <div>
            <ImageUpload value={image} onChange={setImage} className="max-w-[240px]" />
          </div>

          {/* Form Fields */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-2 gap-3">
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
            </div>
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
              className="sm:col-span-2"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="admin-outline"
          onClick={() => setShowPreview(true)}
          className="flex-1 sm:flex-none"
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
        <Button variant="admin" onClick={handleSubmit} className="flex-1 sm:flex-none" size="lg">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      {/* Preview Modal would go here */}
    </div>
  );
}
