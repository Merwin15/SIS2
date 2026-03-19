import React from 'react'
import { Head, Link, router } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react'

export default function Index({ grades, filters }) {
    const handleDelete = (id) => {
        if (confirm('Delete this grade?')) router.delete(`/admin/grades/${id}`)
    }

    return (
        <AdminLayout>
            <Head title="Grades" />
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Grades</h1>
                    <Link href="/admin/grades/create" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
                        <Plus size={16} /> Add Grade
                    </Link>
                </div>
                <div className="mb-4">
                    <SearchInput value={filters.search} routeName="admin.grades.index" />
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="pb-3">Student</th>
                            <th className="pb-3">Course</th>
                            <th className="pb-3">Grade</th>
                            <th className="pb-3">Remarks</th>
                            <th className="pb-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.data.length > 0 ? grades.data.map((grade) => (
                            <tr key={grade.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="py-3 font-medium text-gray-800">{grade.enrollment?.student?.name}</td>
                                <td className="py-3 text-gray-500">{grade.enrollment?.course?.name}</td>
                                <td className="py-3 text-gray-800 font-semibold">{grade.grade}</td>
                                <td className="py-3 text-gray-500">{grade.remarks}</td>
                                <td className="py-3">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/grades/${grade.id}`} className="text-blue-500 hover:text-blue-700"><Eye size={16} /></Link>
                                        <Link href={`/admin/grades/${grade.id}/edit`} className="text-yellow-500 hover:text-yellow-700"><Pencil size={16} /></Link>
                                        <button onClick={() => handleDelete(grade.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={5} className="py-8 text-center text-gray-400">No grades found</td></tr>
                        )}
                    </tbody>
                </table>
                <Pagination links={grades.links} />
            </div>
        </AdminLayout>
    )
}