import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'

export default function Edit({ course, teachers }) {
    const { data, setData, put, processing, errors } = useForm({
        name: course.name,
        code: course.code,
        teacher_id: course.teacher_id ?? '',
        description: course.description ?? '',
        units: course.units,
        status: course.status,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/admin/courses/${course.id}`)
    }

    return (
        <AdminLayout>
            <Head title="Edit Course" />
            <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Course</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                        <input type="text" value={data.code} onChange={e => setData('code', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                        <select value={data.teacher_id} onChange={e => setData('teacher_id', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-- Select Teacher --</option>
                            {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
                        <input type="number" value={data.units} onChange={e => setData('units', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select value={data.status} onChange={e => setData('status', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing}
                            className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 text-sm disabled:opacity-50">
                            {processing ? 'Saving...' : 'Update Course'}
                        </button>
                        <a href="/admin/courses" className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 text-sm">Cancel</a>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}