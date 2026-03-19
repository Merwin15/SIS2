import React from 'react'
import { Head, Link, router } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import { BookPlus, Eye, Pencil, Trash2 } from 'lucide-react'

export default function Index({ courses, filters }) {
    const handleDelete = (id) => {
        if (confirm('Delete this course?')) router.delete(`/admin/courses/${id}`)
    }

    return (
        <AdminLayout>
            <Head title="Courses" />
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
                    <Link href="/admin/courses/create" className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 text-sm">
                        <BookPlus size={16} /> Add Course
                    </Link>
                </div>
                <div className="mb-4">
                    <SearchInput value={filters.search} routeName="admin.courses.index" />
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="pb-3">Name</th>
                            <th className="pb-3">Code</th>
                            <th className="pb-3">Teacher</th>
                            <th className="pb-3">Units</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.data.length > 0 ? courses.data.map((course) => (
                            <tr key={course.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="py-3 font-medium text-gray-800">{course.name}</td>
                                <td className="py-3 text-gray-500">{course.code}</td>
                                <td className="py-3 text-gray-500">{course.teacher?.name ?? 'Unassigned'}</td>
                                <td className="py-3 text-gray-500">{course.units}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {course.status}
                                    </span>
                                </td>
                                <td className="py-3">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/courses/${course.id}`} className="text-blue-500 hover:text-blue-700"><Eye size={16} /></Link>
                                        <Link href={`/admin/courses/${course.id}/edit`} className="text-yellow-500 hover:text-yellow-700"><Pencil size={16} /></Link>
                                        <button onClick={() => handleDelete(course.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={6} className="py-8 text-center text-gray-400">No courses found</td></tr>
                        )}
                    </tbody>
                </table>
                <Pagination links={courses.links} />
            </div>
        </AdminLayout>
    )
}