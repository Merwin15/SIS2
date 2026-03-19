import React from 'react'
import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Pencil, ArrowLeft } from 'lucide-react'

export default function Show({ teacher }) {
    return (
        <AdminLayout>
            <Head title="Teacher Profile" />
            <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Teacher Profile</h1>
                    <div className="flex gap-2">
                        <Link href="/admin/teachers" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft size={16} /> Back</Link>
                        <Link href={`/admin/teachers/${teacher.id}/edit`} className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-600"><Pencil size={14} /> Edit</Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div><p className="text-xs text-gray-400">Name</p><p className="font-medium">{teacher.name}</p></div>
                    <div><p className="text-xs text-gray-400">Email</p><p className="font-medium">{teacher.email}</p></div>
                    <div><p className="text-xs text-gray-400">Employee ID</p><p className="font-medium">{teacher.employee_id}</p></div>
                    <div><p className="text-xs text-gray-400">Department</p><p className="font-medium">{teacher.department}</p></div>
                    <div><p className="text-xs text-gray-400">Phone</p><p className="font-medium">{teacher.phone}</p></div>
                    <div><p className="text-xs text-gray-400">Status</p><p className="font-medium capitalize">{teacher.status}</p></div>
                </div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Courses Handled</h2>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="pb-2">Course</th>
                            <th className="pb-2">Code</th>
                            <th className="pb-2">Units</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacher.courses?.length > 0 ? teacher.courses.map((c) => (
                            <tr key={c.id} className="border-b last:border-0">
                                <td className="py-2">{c.name}</td>
                                <td className="py-2">{c.code}</td>
                                <td className="py-2">{c.units}</td>
                            </tr>
                        )) : (
                            <tr><td colSpan={3} className="py-4 text-center text-gray-400">No courses assigned</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}