import React from 'react'
import { Head, Link, router } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import { UserPlus, Eye, Pencil, Trash2 } from 'lucide-react'

export default function Index({ students, filters }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this student?')) {
            router.delete(`/admin/students/${id}`)
        }
    }

    return (
        <AdminLayout>
            <Head title="Students" />
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Students</h1>
                    <Link href="/admin/students/create" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                        <UserPlus size={16} /> Add Student
                    </Link>
                </div>

                <div className="mb-4">
                    <SearchInput value={filters.search} routeName="admin.students.index" />
                </div>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="pb-3">Name</th>
                            <th className="pb-3">Email</th>
                            <th className="pb-3">Joined</th>
                            <th className="pb-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.data.length > 0 ? students.data.map((student) => (
                            <tr key={student.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="py-3 font-medium text-gray-800">{student.name}</td>
                                <td className="py-3 text-gray-500">{student.email}</td>
                                <td className="py-3 text-gray-400">{new Date(student.created_at).toLocaleDateString()}</td>
                                <td className="py-3">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/students/${student.id}`} className="text-blue-500 hover:text-blue-700"><Eye size={16} /></Link>
                                        <Link href={`/admin/students/${student.id}/edit`} className="text-yellow-500 hover:text-yellow-700"><Pencil size={16} /></Link>
                                        <button onClick={() => handleDelete(student.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={4} className="py-8 text-center text-gray-400">No students found</td></tr>
                        )}
                    </tbody>
                </table>
                <Pagination links={students.links} />
            </div>
        </AdminLayout>
    )
}