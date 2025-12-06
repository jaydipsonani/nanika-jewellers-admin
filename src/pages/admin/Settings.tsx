import { PageHeader } from '@/components/admin/PageHeader';
import { FormInput } from '@/components/admin/FormInput';
import { Button } from '@/components/ui/button';
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
      <PageHeader
        title="Settings"
        description="Manage your account and store settings"
      />

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-card rounded-lg admin-shadow overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">Profile Settings</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput label="Full Name" defaultValue="Admin User" />
              <FormInput label="Email" type="email" defaultValue="admin@nanika.com" />
              <FormInput label="Phone" type="tel" defaultValue="+91 98765 43210" />
              <FormInput label="Role" defaultValue="Administrator" disabled />
            </div>
          </div>
        </div>

        {/* Store Settings */}
        <div className="bg-card rounded-lg admin-shadow overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Store className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">Store Settings</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput label="Store Name" defaultValue="NANIKA Jewels" />
              <FormInput label="Currency" defaultValue="INR (₹)" disabled />
              <FormInput
                label="Store Address"
                defaultValue="123 Jewellery Lane, Mumbai"
                className="sm:col-span-2"
              />
              <FormInput label="GST Number" defaultValue="27AABCU9603R1ZM" />
              <FormInput label="PAN Number" defaultValue="AABCU9603R" />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-lg admin-shadow overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">Notifications</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive order updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-accent peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-background after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">SMS Notifications</p>
                <p className="text-xs text-muted-foreground">Receive order alerts via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-accent peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-background after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-card rounded-lg admin-shadow overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">Security</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput label="Current Password" type="password" placeholder="••••••••" />
              <div></div>
              <FormInput label="New Password" type="password" placeholder="••••••••" />
              <FormInput label="Confirm Password" type="password" placeholder="••••••••" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button variant="admin" onClick={handleSave} size="lg">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
