import React from 'react'
import { Head, Link } from '@inertiajs/react'
import StudentLayout from '@/layouts/StudentLayout'
import { BookOpen, Star, CheckCircle, TrendingUp } from 'lucide-react'

export default function Dashboard({ student, enrollments, grades, stats }) {
    const statCards = [
        { label: 'Enrolled Courses', value: stats.total_enrolled, icon: BookOpen, color: 'bg-blue-500' },
        { label: 'Grades Received', value: stats.total_grades, icon: Star, color: 'bg-yellow-500' },
        { label: 'GPA / Average', value: stats.gpa ?? 'N/A', icon: TrendingUp, color: 'bg-green-500' },
        { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'bg-purple-500' },
    ]

    return (
        <StudentLayout>
            <Head title="Student Dashboard" />

            {/* Welcome */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {student.name}! 👋</h1>
                <p className="text-gray-500 text-sm mt-1">Here's an overview of your academic progress.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card) => {
                    const Icon = card.icon
                    return (
                        <div key={card.label} className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
                            <div className={`${card.color} text-white p-3 rounded-lg`}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{card.label}</p>
                                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Enrolled Courses */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">My Courses</h2>
                        <Link href="/student/courses" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>
                    </div>
                    <div className="space-y-3">
                        {enrollments.length > 0 ? enrollments.slice(0, 5).map((e) => (
                            <div key={e.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{e.course?.name}</p>
                                    <p className="text-xs text-gray-400">{e.course?.teacher?.name ?? 'No teacher'} • {e.semester}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                    e.status === 'enrolled' ? 'bg-green-100 text-green-700' :
                                    e.status === 'dropped' ? 'bg-red-100 text-red-700' :
                                    'bg-blue-100 text-blue-700'}`}>
                                    {e.status}
                                </span>
                            </div>
                        )) : (
                            <p className="text-center text-gray-400 text-sm py-4">No courses enrolled yet</p>
                        )}
                    </div>
                </div>

                {/* Recent Grades */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Recent Grades</h2>
                        <Link href="/student/grades" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>
                    </div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500 border-b">
                                <th className="pb-2">Course</th>
                                <th className="pb-2">Grade</th>
                                <th className="pb-2">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.length > 0 ? grades.slice(0, 5).map((g) => (
                                <tr key={g.id} className="border-b last:border-0">
                                    <td className="py-2 text-gray-700">{g.enrollment?.course?.name}</td>
                                    <td className="py-2 font-bold text-gray-800">{g.grade}</td>
                                    <td className="py-2 text-gray-400">{g.remarks ?? 'N/A'}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan={3} className="py-4 text-center text-gray-400">No grades yet</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </StudentLayout>
    )
}