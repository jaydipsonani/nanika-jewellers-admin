import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
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
import styles from './Sidebar.module.scss';

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen?: boolean; // For mobile drawer state handling if passed down
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

export function Sidebar({ collapsed, onToggle, mobileOpen }: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [expandedMenus, setExpandedMenus] = useState<string[]>(['Diamonds', 'Jewellery', 'Sales']);

    const toggleMenu = (label: string) => {
        setExpandedMenus((prev) =>
            prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
        );
    };

    // Helper to check if a regular path is active
    const isActive = (path: string) => location.pathname === path;

    // Helper to check if any child of a parent menu is active
    const isParentActive = (children?: { path: string }[]) =>
        children?.some((child) => location.pathname === child.path);

    return (
        <aside
            className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${mobileOpen ? styles.mobileOpen : ''
                }`}
        >
            {/* Header */}
            <div className={styles.header}>
                {!collapsed && (
                    <div className={styles.brand}>
                        <Diamond size={24} color="#D4AF37" />
                        <span>NANIKA</span>
                    </div>
                )}
                {collapsed && <Diamond size={24} color="#D4AF37" className="mx-auto" />}

                {/* Only show toggle button on desktop, handled by CSS media queries or logic in layout to hide this on mobile if needed. 
            For now, we keep it but it might need to be hidden on mobile if the layout handles the toggle differently? 
            Usually sidebar toggle is only for desktop collapse. Mobile uses a separate overlay close. 
        */}
                <button
                    onClick={onToggle}
                    className={`${styles.toggleBtn} ${collapsed ? styles.center : ''} hidden-mobile`} // You might need a utility class for hidden-mobile if not in module
                // We can add a class to hide it on mobile if the prop isn't passed or check screen size, but standard way is `display: none` in mobile query
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className={styles.nav}>
                {menuItems.map((item) => (
                    <div key={item.label} className={styles.menuItem}>
                        {item.path ? (
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `${styles.link} ${isActive ? styles.active : ''}`
                                }
                            >
                                <item.icon className={styles.icon} />
                                {!collapsed && <span className={styles.label}>{item.label}</span>}
                            </NavLink>
                        ) : (
                            <>
                                <button
                                    onClick={() => !collapsed && toggleMenu(item.label)}
                                    className={`${styles.link} ${isParentActive(item.children) ? styles.active : ''
                                        }`}
                                >
                                    <item.icon className={styles.icon} />
                                    {!collapsed && (
                                        <>
                                            <span className={styles.label}>{item.label}</span>
                                            <ChevronDown
                                                className={`${styles.chevron} ${expandedMenus.includes(item.label) ? styles.rotated : ''
                                                    }`}
                                            />
                                        </>
                                    )}
                                </button>

                                {/* Submenu */}
                                {!collapsed && expandedMenus.includes(item.label) && item.children && (
                                    <div className={styles.subMenu}>
                                        {item.children.map((child) => (
                                            <NavLink
                                                key={child.path}
                                                to={child.path}
                                                className={({ isActive }) =>
                                                    `${styles.link} ${isActive ? styles.active : ''}`
                                                }
                                            >
                                                <child.icon className={styles.icon} />
                                                <span className={styles.label}>{child.label}</span>
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
            <div className={styles.logoutWrapper}>
                <button
                    onClick={() => {
                        sessionStorage.removeItem('isAdminAuthenticated');
                        toast.success('Logged out successfully');
                        navigate('/login');
                    }}
                    className={styles.logoutBtn}
                >
                    <LogOut className={styles.icon} />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
}
