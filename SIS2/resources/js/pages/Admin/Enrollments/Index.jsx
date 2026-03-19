import React from 'react'
import { Head, Link, router } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react'

export default function Index({ enrollments, filters }) {
    const handleDelete = (id) => {
        if (confirm('Delete this enrollment?')) router.delete(`/admin/enrollments/${id}`)
    }

    return (
        <AdminLayout>
            <Head title="Enrollments" />
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Enrollments</h1>
                    <Link href="/admin/enrollments/create" className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm">
                        <Plus size={16} /> Add Enrollment
                    </Link>
                </div>
                <div className="mb-4">
                    <SearchInput value={filters.search} routeName="admin.enrollments.index" />
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="pb-3">Student</th>
                            <th className="pb-3">Course</th>
                            <th className="pb-3">Instructor</th>
                            <th className="pb-3">Semester</th>
                            <th className="pb-3">School Year</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.data.length > 0 ? enrollments.data.map((e) => (
                            <tr key={e.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="py-3 font-medium text-gray-800">{e.student?.name}</td>
                                <td className="py-3 text-gray-500">{e.course?.name}</td>
                                <td className="py-3 text-gray-500">{e.teacher?.name ?? 'Unassigned'}</td>
                                <td className="py-3 text-gray-500">{e.semester}</td>
                                <td className="py-3 text-gray-500">{e.school_year}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        e.status === 'enrolled' ? 'bg-green-100 text-green-700' :
                                        e.status === 'dropped' ? 'bg-red-100 text-red-700' :
                                        'bg-blue-100 text-blue-700'}`}>
                                        {e.status}
                                    </span>
                                </td>
                                <td className="py-3">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/enrollments/${e.id}`} className="text-blue-500 hover:text-blue-700"><Eye size={16} /></Link>
                                        <Link href={`/admin/enrollments/${e.id}/edit`} className="text-yellow-500 hover:text-yellow-700"><Pencil size={16} /></Link>
                                        <button onClick={() => handleDelete(e.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={7} className="py-8 text-center text-gray-400">No enrollments found</td></tr>
                        )}
                    </tbody>
                </table>
                <Pagination links={enrollments.links} />
            </div>
        </AdminLayout>
    )
}