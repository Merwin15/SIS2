import React from 'react'
import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Pencil, ArrowLeft } from 'lucide-react'

export default function Show({ enrollment }) {
    return (
        <AdminLayout>
            <Head title="Enrollment Details" />
            <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Enrollment Details</h1>
                    <div className="flex gap-2">
                        <Link href="/admin/enrollments" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                            <ArrowLeft size={16} /> Back
                        </Link>
                        <Link href={`/admin/enrollments/${enrollment.id}/edit`} className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-600">
                            <Pencil size={14} /> Edit
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div><p className="text-xs text-gray-400">Student</p><p className="font-medium">{enrollment.student?.name}</p></div>
                    <div><p className="text-xs text-gray-400">Course</p><p className="font-medium">{enrollment.course?.name}</p></div>
                    <div><p className="text-xs text-gray-400">Semester</p><p className="font-medium">{enrollment.semester}</p></div>
                    <div><p className="text-xs text-gray-400">School Year</p><p className="font-medium">{enrollment.school_year}</p></div>
                    <div><p className="text-xs text-gray-400">Status</p>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                            enrollment.status === 'enrolled' ? 'bg-green-100 text-green-700' :
                            enrollment.status === 'dropped' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'}`}>
                            {enrollment.status}
                        </span>
                    </div>
                </div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Grades</h2>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="pb-2">Grade</th>
                            <th className="pb-2">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollment.grades?.length > 0 ? enrollment.grades.map((g) => (
                            <tr key={g.id} className="border-b last:border-0">
                                <td className="py-2 font-semibold">{g.grade}</td>
                                <td className="py-2">{g.remarks}</td>
                            </tr>
                        )) : (
                            <tr><td colSpan={2} className="py-4 text-center text-gray-400">No grades yet</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}