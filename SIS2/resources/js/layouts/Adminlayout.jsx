import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    ClipboardList,
    Star,
    LogOut,
    Menu,
    X,
    ChevronRight
} from 'lucide-react'
import FlashMessage from '@/components/FlashMessage'

const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/students', icon: Users, label: 'Students' },
    { href: '/admin/teachers', icon: GraduationCap, label: 'Teachers' },
    { href: '/admin/courses', icon: BookOpen, label: 'Courses' },
    { href: '/admin/enrollments', icon: ClipboardList, label: 'Enrollments' },
    { href: '/admin/grades', icon: Star, label: 'Grades' },
]

export default function AdminLayout({ children }) {
    const { url } = usePage()
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white flex flex-col transition-all duration-300`}>
                {/* Logo */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    {sidebarOpen && (
                        <span className="text-lg font-bold text-white">SIS Admin</span>
                    )}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 py-4">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = url.startsWith(item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                            >
                                <Icon size={20} className="shrink-0" />
                                {sidebarOpen && <span>{item.label}</span>}
                                {sidebarOpen && isActive && <ChevronRight size={16} className="ml-auto" />}
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="border-t border-gray-700 p-4">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex items-center gap-3 text-sm text-gray-400 hover:text-white w-full"
                    >
                        <LogOut size={20} className="shrink-0" />
                        {sidebarOpen && <span>Logout</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users size={16} />
                        <span>Administrator</span>
                    </div>
                </header>

                {/* Flash Message appears here, right after header */}
                <FlashMessage />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}