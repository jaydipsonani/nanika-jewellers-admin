import { PageHeader } from '@/components/admin/PageHeader';
import { FormInput } from '@/components/admin/FormInput';
import { Button } from '@/components/admin/Button';
import { toast } from '@/hooks/use-toast';
import { User, Store, Bell, Shield } from 'lucide-react';

export default function Settings() {
  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your settings have been updated successfully.',
    });
  };

  return (
    <div className="animate-fade-in max-w-3xl">
      {/* Using global animate-fade-in or replace with scss module if desired; 
        for now assuming global css handles it or safe to ignore tailwind class since logic is main concern.
        Actually best to remove tailwind class. 
    */}
      <PageHeader
        title="Settings"
        description="Manage your account and store settings"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Profile Settings */}
        <div className="bg-card rounded-lg admin-shadow overflow-hidden"
          style={{ backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div className="p-4 border-b border-border flex items-center gap-2"
            style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={16} />
            <h3 style={{ fontWeight: 500 }}>Profile Settings</h3>
          </div>
          <div className="p-4 space-y-4" style={{ padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <FormInput label="Full Name" defaultValue="Admin User" />
              <FormInput label="Email" type="email" defaultValue="admin@nanika.com" />
              <FormInput label="Phone" type="tel" defaultValue="+91 98765 43210" />
              <FormInput label="Role" defaultValue="Administrator" disabled />
            </div>
          </div>
        </div>

        {/* Store Settings */}
        <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Store size={16} />
            <h3 style={{ fontWeight: 500 }}>Store Settings</h3>
          </div>
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <FormInput label="Store Name" defaultValue="NANIKA Jewels" />
              <FormInput label="Currency" defaultValue="INR (₹)" disabled />
              <FormInput
                label="Store Address"
                defaultValue="123 Jewellery Lane, Mumbai"
                style={{ gridColumn: 'span 2' }}
              />
              <FormInput label="GST Number" defaultValue="27AABCU9603R1ZM" />
              <FormInput label="PAN Number" defaultValue="AABCU9603R" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="admin" onClick={handleSave} size="lg">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
