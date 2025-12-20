import { PageHeader } from '@/components/admin/PageHeader';
import { DiamondForm } from '@/components/admin/Diamonds/DiamondForm';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function AddDiamond() {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // API Call would go here
    console.log('Submitting diamond:', data);
    toast({
      title: 'Diamond Added',
      description: 'The diamond has been successfully added to inventory.',
    });
    // navigate('/admin/diamonds');
  };

  return (
    <div className="animate-fade-in">
      {/* animate-fade-in is likely a tailwind class defined in index.css (or global scss if I moved it). 
        I should probably ensure global SCSS has this animation class or similar. 
        For now I will leave it as className, assuming global.scss handles utilities or I will address it in cleanup. 
        Actually, I should use localized style or ensure it exists.
        Let's use a wrapper div with inline style or just assume global css class for now to minimize friction.
    */}
      <PageHeader
        title="Add Diamond"
        description="Add a new diamond to your inventory"
      />

      <DiamondForm onSubmit={handleSubmit} />
    </div>
  );
}
