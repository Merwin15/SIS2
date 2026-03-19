import React from 'react'
import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Pencil, ArrowLeft } from 'lucide-react'

export default function Show({ student }) {
    return (
        <AdminLayout>
            <Head title="Student Profile" />
            <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Student Profile</h1>
                    <div className="flex gap-2">
                        <Link href="/admin/students" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                            <ArrowLeft size={16} /> Back
                        </Link>
                        <Link href={`/admin/students/${student.id}/edit`} className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-600">
                            <Pencil size={14} /> Edit
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div><p className="text-xs text-gray-400">Name</p><p className="font-medium">{student.name}</p></div>
                    <div><p className="text-xs text-gray-400">Email</p><p className="font-medium">{student.email}</p></div>
                    <div><p className="text-xs text-gray-400">Role</p><p className="font-medium capitalize">{student.role}</p></div>
                    <div><p className="text-xs text-gray-400">Joined</p><p className="font-medium">{new Date(student.created_at).toLocaleDateString()}</p></div>
                </div>

                <h2 className="text-lg font-semibold text-gray-700 mb-3">Enrolled Courses</h2>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="pb-2">Course</th>
                            <th className="pb-2">Semester</th>
                            <th className="pb-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {student.enrollments?.length > 0 ? student.enrollments.map((e) => (
                            <tr key={e.id} className="border-b last:border-0">
                                <td className="py-2">{e.course?.name}</td>
                                <td className="py-2">{e.semester}</td>
                                <td className="py-2 capitalize">{e.status}</td>
                            </tr>
                        )) : (
                            <tr><td colSpan={3} className="py-4 text-center text-gray-400">No enrollments</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}