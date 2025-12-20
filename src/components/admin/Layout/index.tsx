import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { Menu } from 'lucide-react';
import styles from './Layout.module.scss';

export function Layout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className={styles.layout}>
            {/* Mobile Overlay */}
            <div
                className={`${styles.overlay} ${mobileMenuOpen ? styles.visible : ''}`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Header (Hamburger) */}
            <div className={styles.mobileHeader}>
                <button
                    className={styles.menuBtn}
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu size={24} />
                </button>
                <span style={{ fontWeight: 600 }}>NANIKA ADMIN</span>
            </div>

            {/* Sidebar */}
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                mobileOpen={mobileMenuOpen}
            />

            {/* Main Content */}
            <main
                className={`${styles.main} ${sidebarCollapsed ? styles.collapsed : styles.expanded
                    }`}
            >
                <div className={styles.content}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
