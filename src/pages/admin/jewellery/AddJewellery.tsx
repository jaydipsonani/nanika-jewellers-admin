import { useState } from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { CategoryTabs } from '@/components/admin/CategoryTabs';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { FormInput } from '@/components/admin/FormInput';
import { FormSelect } from '@/components/admin/FormSelect';
import { Button } from '@/components/ui/button';
import { JewelleryCategory, DiamondDetail } from '@/types/admin';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';

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

export default function AddJewellery() {
  const [category, setCategory] = useState<JewelleryCategory>('ring');
  const [image, setImage] = useState<string>();
  const [formData, setFormData] = useState({
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
    console.log('Submitting jewellery:', {
      category,
      image,
      ...formData,
      diamonds,
    });

    toast({
      title: 'Jewellery Added',
      description: 'The jewellery item has been successfully added to inventory.',
    });
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Add Jewellery"
        description="Add a new jewellery item to your inventory"
      />

      {/* Category Tabs */}
      <div className="bg-card rounded-lg p-6 admin-shadow mb-6">
        <CategoryTabs
          tabs={categoryTabs}
          value={category}
          onChange={(v) => setCategory(v as JewelleryCategory)}
          variant="pills"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Image */}
        <div className="bg-card rounded-lg p-6 admin-shadow">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Product Image</h3>
          <ImageUpload value={image} onChange={setImage} />
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Details */}
          <div className="bg-card rounded-lg p-6 admin-shadow">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Product Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Title"
                placeholder="e.g., Emerald Glow Solitaire Ring"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="sm:col-span-2"
              />
              <FormInput
                label="Description"
                placeholder="Product description..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="sm:col-span-2"
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
          <div className="bg-card rounded-lg p-6 admin-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Diamond & Gemstones</h3>
              <Button variant="admin-outline" size="sm" onClick={addDiamondRow}>
                <Plus className="h-3 w-3" />
                Add Row
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 px-2 text-left font-medium text-muted-foreground">Size</th>
                    <th className="py-2 px-2 text-left font-medium text-muted-foreground">Color</th>
                    <th className="py-2 px-2 text-left font-medium text-muted-foreground">Clarity</th>
                    <th className="py-2 px-2 text-left font-medium text-muted-foreground">Shape</th>
                    <th className="py-2 px-2 text-left font-medium text-muted-foreground">No.</th>
                    <th className="py-2 px-2 text-left font-medium text-muted-foreground">Weight</th>
                    <th className="py-2 px-2 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {diamonds.map((diamond, index) => (
                    <tr key={diamond.id} className="border-b border-border/50">
                      <td className="py-2 px-1">
                        <input
                          type="text"
                          placeholder="0.08-0.17"
                          value={diamond.size}
                          onChange={(e) => handleDiamondChange(index, 'size', e.target.value)}
                          className="w-20 px-2 py-1 text-xs rounded border border-input bg-background"
                        />
                      </td>
                      <td className="py-2 px-1">
                        <input
                          type="text"
                          placeholder="EF"
                          value={diamond.color}
                          onChange={(e) => handleDiamondChange(index, 'color', e.target.value)}
                          className="w-14 px-2 py-1 text-xs rounded border border-input bg-background"
                        />
                      </td>
                      <td className="py-2 px-1">
                        <input
                          type="text"
                          placeholder="VVS/VS"
                          value={diamond.clarity}
                          onChange={(e) => handleDiamondChange(index, 'clarity', e.target.value)}
                          className="w-16 px-2 py-1 text-xs rounded border border-input bg-background"
                        />
                      </td>
                      <td className="py-2 px-1">
                        <input
                          type="text"
                          placeholder="Tapper"
                          value={diamond.shape}
                          onChange={(e) => handleDiamondChange(index, 'shape', e.target.value)}
                          className="w-16 px-2 py-1 text-xs rounded border border-input bg-background"
                        />
                      </td>
                      <td className="py-2 px-1">
                        <input
                          type="number"
                          placeholder="0"
                          value={diamond.noOfDiamonds || ''}
                          onChange={(e) => handleDiamondChange(index, 'noOfDiamonds', parseInt(e.target.value) || 0)}
                          className="w-12 px-2 py-1 text-xs rounded border border-input bg-background"
                        />
                      </td>
                      <td className="py-2 px-1">
                        <input
                          type="number"
                          placeholder="0.00"
                          step="0.001"
                          value={diamond.totalWeight || ''}
                          onChange={(e) => handleDiamondChange(index, 'totalWeight', parseFloat(e.target.value) || 0)}
                          className="w-16 px-2 py-1 text-xs rounded border border-input bg-background"
                        />
                      </td>
                      <td className="py-2 px-1">
                        <button
                          onClick={() => removeDiamondRow(index)}
                          disabled={diamonds.length === 1}
                          className="p-1 rounded hover:bg-destructive/10 disabled:opacity-30"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5} className="py-2 px-2 text-right font-medium text-muted-foreground">
                      Total Weight:
                    </td>
                    <td className="py-2 px-2 font-medium">{totalDiamondWeight.toFixed(3)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Price Display */}
          <div className="bg-muted rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Estimated Price</p>
            <p className="text-3xl font-semibold text-foreground">
              ₹{estimatedPrice.toLocaleString()}/-
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              This is an estimated price, actual price may differ as per actual weights.
            </p>
          </div>

          {/* Submit Button */}
          <Button variant="admin" onClick={handleSubmit} className="w-full" size="xl">
            <Plus className="h-4 w-4" />
            Add Jewellery
          </Button>
        </div>
      </div>
    </div>
  );
}
