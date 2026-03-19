import React from 'react'
import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import {
    Users,
    GraduationCap,
    BookOpen,
    ClipboardList,
    UserPlus,
    BookPlus,
} from 'lucide-react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function Dashboard({ stats, recentStudents, recentEnrollments, monthlyEnrollments }) {
    const chartData = MONTHS.map((month, i) => {
        const found = monthlyEnrollments?.find(e => e.month === i + 1)
        return { month, enrollments: found ? found.count : 0 }
    })

    const statCards = [
        { label: 'Total Students',    value: stats.total_students,    icon: Users,          color: 'bg-blue-500' },
        { label: 'Total Teachers',    value: stats.total_teachers,    icon: GraduationCap,  color: 'bg-green-500' },
        { label: 'Total Courses',     value: stats.total_courses,     icon: BookOpen,       color: 'bg-yellow-500' },
        { label: 'Total Enrollments', value: stats.total_enrollments, icon: ClipboardList,  color: 'bg-purple-500' },
    ]

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

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

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/admin/students/create"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                    >
                        <UserPlus size={16} /> Add Student
                    </Link>
                    <Link
                        href="/admin/teachers/create"
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                    >
                        <GraduationCap size={16} /> Add Teacher
                    </Link>
                    <Link
                        href="/admin/courses/create"
                        className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 text-sm"
                    >
                        <BookPlus size={16} /> Add Course
                    </Link>
                    <Link
                        href="/admin/enrollments/create"
                        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm"
                    >
                        <ClipboardList size={16} /> Add Enrollment
                    </Link>
                </div>
            </div>

            {/* Chart + Recent Students */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Enrollments</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey="enrollments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Students */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Students</h2>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500 border-b">
                                <th className="pb-2">Name</th>
                                <th className="pb-2">Email</th>
                                <th className="pb-2">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentStudents?.length > 0 ? recentStudents.map((student) => (
                                <tr key={student.id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="py-2 font-medium text-gray-800">{student.name}</td>
                                    <td className="py-2 text-gray-500">{student.email}</td>
                                    <td className="py-2 text-gray-400">
                                        {new Date(student.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={3} className="py-4 text-center text-gray-400">No students yet</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Enrollments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Enrollments</h2>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="pb-2">Student</th>
                            <th className="pb-2">Course</th>
                            <th className="pb-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentEnrollments?.length > 0 ? recentEnrollments.map((enrollment) => (
                            <tr key={enrollment.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="py-2 font-medium text-gray-800">{enrollment.student?.name ?? 'N/A'}</td>
                                <td className="py-2 text-gray-500">{enrollment.course?.name ?? 'N/A'}</td>
                                <td className="py-2 text-gray-400">
                                    {new Date(enrollment.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={3} className="py-4 text-center text-gray-400">No enrollments yet</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}