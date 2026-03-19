import React from 'react'
import { Head } from '@inertiajs/react'
import { GraduationCap, Users, BookOpen, ClipboardList, ArrowRight, Star } from 'lucide-react'

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full opacity-5 blur-3xl" />
                </div>

                {/* Navbar */}
                <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                            <GraduationCap size={22} className="text-white" />
                        </div>
                        <span className="text-white font-bold text-lg">SIS Portal</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {auth?.user ? (
                            <a href="/dashboard"
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                Go to Dashboard
                            </a>
                        ) : (
                            <>
                                <a href="/login"
                                    className="text-gray-300 hover:text-white px-4 py-2 text-sm transition-colors">
                                    Sign In
                                </a>
                                <a href="/register"
                                    className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                    Sign Up
                                </a>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24">
                    <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm px-4 py-1.5 rounded-full mb-6">
                        <Star size={14} /> Student Information System
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Manage Your<br />
                        <span className="text-blue-400">Academic Journey</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mb-10">
                        A complete platform for students and administrators to manage enrollments, grades, courses, and more — all in one place.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="/register"
                            className="flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm">
                            Get Started <ArrowRight size={16} />
                        </a>
                        <a href="/login"
                            className="flex items-center gap-2 bg-white/10 text-white px-7 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors text-sm border border-white/20">
                            Sign In
                        </a>
                    </div>
                </div>

                {/* Features */}
                <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: Users, title: 'Student Management', desc: 'Manage all student records and profiles easily.', color: 'bg-blue-500' },
                            { icon: BookOpen, title: 'Course Management', desc: 'Organize courses, subjects, and assignments.', color: 'bg-green-500' },
                            { icon: ClipboardList, title: 'Enrollment System', desc: 'Handle student enrollments per semester.', color: 'bg-yellow-500' },
                            { icon: Star, title: 'Grades Tracking', desc: 'Track and manage student grades and remarks.', color: 'bg-purple-500' },
                        ].map((feature) => {
                            const Icon = feature.icon
                            return (
                                <div key={feature.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                                    <div className={`${feature.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
                                        <Icon size={20} className="text-white" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 border-t border-white/10 py-6 text-center">
                    <p className="text-gray-500 text-sm">© 2026 SIS Portal. All rights reserved.</p>
                </div>
            </div>
        </>
    )
}