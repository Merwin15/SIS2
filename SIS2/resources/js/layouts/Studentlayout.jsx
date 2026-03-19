import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import {
    LayoutDashboard,
    BookOpen,
    Star,
    User,
    LogOut,
    Menu,
    X,
    ChevronRight,
    GraduationCap,
} from 'lucide-react'
import FlashMessage from '@/components/FlashMessage'

const navItems = [
    { href: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/student/courses', icon: BookOpen, label: 'My Courses' },
    { href: '/student/grades', icon: Star, label: 'My Grades' },
    { href: '/student/profile', icon: User, label: 'Profile' },
]

export default function StudentLayout({ children }) {
    const { url, props } = usePage()
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const student = props.auth?.user

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white flex flex-col transition-all duration-300`}>
                {/* Logo */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    {sidebarOpen && (
                        <div className="flex items-center gap-2">
                            <GraduationCap size={20} className="text-blue-400" />
                            <span className="text-lg font-bold text-white">SIS Portal</span>
                        </div>
                    )}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Student info */}
                {sidebarOpen && student && (
                    <div className="px-4 py-3 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {student.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">{student.name}</p>
                                <p className="text-xs text-gray-400 truncate">{student.email}</p>
                            </div>
                        </div>
                    </div>
                )}

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
                    <h1 className="text-xl font-semibold text-gray-800">Student Portal</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={16} />
                        <span>{student?.name}</span>
                    </div>
                </header>

                <FlashMessage />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}