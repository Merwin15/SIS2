import React from 'react'
import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Pencil, ArrowLeft } from 'lucide-react'

export default function Show({ grade }) {
    return (
        <AdminLayout>
            <Head title="Grade Details" />
            <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Grade Details</h1>
                    <div className="flex gap-2">
                        <Link href="/admin/grades" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                            <ArrowLeft size={16} /> Back
                        </Link>
                        <Link href={`/admin/grades/${grade.id}/edit`} className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-600">
                            <Pencil size={14} /> Edit
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-xs text-gray-400">Student</p><p className="font-medium">{grade.enrollment?.student?.name}</p></div>
                    <div><p className="text-xs text-gray-400">Course</p><p className="font-medium">{grade.enrollment?.course?.name}</p></div>
                    <div><p className="text-xs text-gray-400">Grade</p><p className="text-2xl font-bold text-gray-800">{grade.grade}</p></div>
                    <div><p className="text-xs text-gray-400">Remarks</p><p className="font-medium">{grade.remarks ?? 'N/A'}</p></div>
                </div>
            </div>
        </AdminLayout>
    )
}