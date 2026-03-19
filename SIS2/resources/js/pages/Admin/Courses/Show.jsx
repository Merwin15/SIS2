import React from 'react'
import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Pencil, ArrowLeft } from 'lucide-react'

export default function Show({ course }) {
    return (
        <AdminLayout>
            <Head title="Course Details" />
            <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Course Details</h1>
                    <div className="flex gap-2">
                        <Link href="/admin/courses" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                            <ArrowLeft size={16} /> Back
                        </Link>
                        <Link href={`/admin/courses/${course.id}/edit`} className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-600">
                            <Pencil size={14} /> Edit
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div><p className="text-xs text-gray-400">Course Name</p><p className="font-medium">{course.name}</p></div>
                    <div><p className="text-xs text-gray-400">Code</p><p className="font-medium">{course.code}</p></div>
                    <div><p className="text-xs text-gray-400">Teacher</p><p className="font-medium">{course.teacher?.name ?? 'Unassigned'}</p></div>
                    <div><p className="text-xs text-gray-400">Units</p><p className="font-medium">{course.units}</p></div>
                    <div><p className="text-xs text-gray-400">Status</p>
                        <span className={`px-2 py-1 rounded-full text-xs ${course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {course.status}
                        </span>
                    </div>
                </div>
                {course.description && (
                    <div className="mb-6">
                        <p className="text-xs text-gray-400 mb-1">Description</p>
                        <p className="text-sm text-gray-700">{course.description}</p>
                    </div>
                )}
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Enrolled Students</h2>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="pb-2">Student</th>
                            <th className="pb-2">Semester</th>
                            <th className="pb-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {course.enrollments?.length > 0 ? course.enrollments.map((e) => (
                            <tr key={e.id} className="border-b last:border-0">
                                <td className="py-2">{e.student?.name}</td>
                                <td className="py-2">{e.semester}</td>
                                <td className="py-2 capitalize">{e.status}</td>
                            </tr>
                        )) : (
                            <tr><td colSpan={3} className="py-4 text-center text-gray-400">No students enrolled</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}