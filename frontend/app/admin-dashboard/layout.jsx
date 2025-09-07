'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';



export default function AdminDashboardLayout({ children }) {
    const pathname = usePathname();
    
    const navItems = [
        { name: 'Dashboard', path: '/admin-dashboard' },
        { name: 'Users', path: '/admin-dashboard/users' },
        { name: 'Content', path: '/admin-dashboard/content' },
        { name: 'Settings', path: '/admin-dashboard/settings' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                </div>
                <nav className="mt-6">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link href={item.path}>
                                    <div className={`flex items-center px-6 py-3 ${
                                        pathname === item.path ? 'bg-blue-100 text-blue-600' : ''
                                    }`}>
                                        {item.name}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm">
                    <div className="px-6 py-4">
                        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
                    </div>
                </header>
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}