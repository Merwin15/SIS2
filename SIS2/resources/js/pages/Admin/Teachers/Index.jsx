import React from 'react'
import { Head, Link, router } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import { UserPlus, Eye, Pencil, Trash2 } from 'lucide-react'

export default function Index({ teachers, filters }) {
    const handleDelete = (id) => {
        if (confirm('Delete this teacher?')) router.delete(`/admin/teachers/${id}`)
    }

    return (
        <AdminLayout>
            <Head title="Teachers" />
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Teachers</h1>
                    <Link href="/admin/teachers/create" className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                        <UserPlus size={16} /> Add Teacher
                    </Link>
                </div>
                <div className="mb-4">
                    <SearchInput value={filters.search} routeName="admin.teachers.index" />
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="pb-3">Name</th>
                            <th className="pb-3">Email</th>
                            <th className="pb-3">Employee ID</th>
                            <th className="pb-3">Department</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.data.length > 0 ? teachers.data.map((teacher) => (
                            <tr key={teacher.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="py-3 font-medium text-gray-800">{teacher.name}</td>
                                <td className="py-3 text-gray-500">{teacher.email}</td>
                                <td className="py-3 text-gray-500">{teacher.employee_id}</td>
                                <td className="py-3 text-gray-500">{teacher.department}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${teacher.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {teacher.status}
                                    </span>
                                </td>
                                <td className="py-3">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/teachers/${teacher.id}`} className="text-blue-500 hover:text-blue-700"><Eye size={16} /></Link>
                                        <Link href={`/admin/teachers/${teacher.id}/edit`} className="text-yellow-500 hover:text-yellow-700"><Pencil size={16} /></Link>
                                        <button onClick={() => handleDelete(teacher.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={6} className="py-8 text-center text-gray-400">No teachers found</td></tr>
                        )}
                    </tbody>
                </table>
                <Pagination links={teachers.links} />
            </div>
        </AdminLayout>
    )
}