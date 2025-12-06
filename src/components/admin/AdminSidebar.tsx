import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Diamond,
  Gem,
  ShoppingCart,
  Settings,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  List,
  Users,
  FileText,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface MenuItem {
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: { label: string; path: string; icon: React.ElementType }[];
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  {
    label: 'Diamonds',
    icon: Diamond,
    children: [
      { label: 'Add Diamond', path: '/admin/diamonds/add', icon: Plus },
      { label: 'Manage Diamonds', path: '/admin/diamonds', icon: List },
    ],
  },
  {
    label: 'Jewellery',
    icon: Gem,
    children: [
      { label: 'Add Jewellery', path: '/admin/jewellery/add', icon: Plus },
      { label: 'Manage Jewellery', path: '/admin/jewellery', icon: List },
    ],
  },
  {
    label: 'Sales',
    icon: ShoppingCart,
    children: [
      { label: 'Sales List', path: '/admin/sales', icon: FileText },
      { label: 'Orders', path: '/admin/orders', icon: List },
      { label: 'Customers', path: '/admin/customers', icon: Users },
    ],
  },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

export function AdminSidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Diamonds', 'Jewellery', 'Sales']);

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (children?: { path: string }[]) =>
    children?.some((child) => location.pathname === child.path);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border admin-transition',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Diamond className="h-7 w-7 text-accent" />
            <span className="font-semibold text-lg text-sidebar-primary">NANIKA</span>
          </div>
        )}
        {collapsed && <Diamond className="h-7 w-7 text-accent mx-auto" />}
        <button
          onClick={onToggle}
          className={cn(
            'p-1.5 rounded-md hover:bg-sidebar-accent admin-transition',
            collapsed && 'mx-auto mt-2'
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-sidebar-foreground" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3 overflow-y-auto h-[calc(100vh-8rem)]">
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.path ? (
              <NavLink
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg admin-transition',
                  'hover:bg-sidebar-accent',
                  isActive(item.path)
                    ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                    : 'text-sidebar-foreground'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </NavLink>
            ) : (
              <>
                <button
                  onClick={() => !collapsed && toggleMenu(item.label)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg admin-transition',
                    'hover:bg-sidebar-accent',
                    isParentActive(item.children)
                      ? 'text-sidebar-primary font-medium'
                      : 'text-sidebar-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="text-sm flex-1 text-left">{item.label}</span>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 admin-transition',
                          expandedMenus.includes(item.label) && 'rotate-180'
                        )}
                      />
                    </>
                  )}
                </button>
                {!collapsed && expandedMenus.includes(item.label) && item.children && (
                  <div className="ml-4 mt-1 space-y-1 animate-fade-in">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-lg admin-transition text-sm',
                          'hover:bg-sidebar-accent',
                          isActive(child.path)
                            ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                            : 'text-sidebar-foreground'
                        )}
                      >
                        <child.icon className="h-4 w-4 flex-shrink-0" />
                        <span>{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-sidebar-border">
        <button
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg admin-transition',
            'hover:bg-destructive/10 text-destructive'
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
