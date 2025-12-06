import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

export function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-card admin-shadow lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          'lg:hidden fixed inset-y-0 left-0 z-40 transform admin-transition',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <AdminSidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <main
        className={cn(
          'min-h-screen admin-transition pt-16 lg:pt-0',
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
        )}
      >
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
