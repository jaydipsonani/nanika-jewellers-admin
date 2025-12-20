import { PageHeader } from '@/components/admin/PageHeader';
import { JewelleryForm } from '@/components/admin/Jewellery/JewelleryForm';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function AddJewellery() {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log('Submitting jewellery:', data);
    toast({
      title: 'Jewellery Added',
      description: 'The jewellery item has been successfully added to inventory.',
    });
    // navigate('/admin/jewellery');
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Add Jewellery"
        description="Add a new jewellery item to your inventory"
      />

      <JewelleryForm onSubmit={handleSubmit} />
    </div>
  );
}
