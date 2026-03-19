import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'

export default function Create({ enrollments }) {
    const { data, setData, post, processing, errors } = useForm({
        enrollment_id: '', grade: '', remarks: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/admin/grades')
    }

    return (
        <AdminLayout>
            <Head title="Add Grade" />
            <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Grade</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment</label>
                        <select value={data.enrollment_id} onChange={e => setData('enrollment_id', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-- Select Enrollment --</option>
                            {enrollments.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.student?.name} - {e.course?.name}
                                </option>
                            ))}
                        </select>
                        {errors.enrollment_id && <p className="text-red-500 text-xs mt-1">{errors.enrollment_id}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                        <input type="number" step="0.01" min="0" max="100" value={data.grade} onChange={e => setData('grade', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                        <input type="text" value={data.remarks} onChange={e => setData('remarks', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 text-sm disabled:opacity-50">
                            {processing ? 'Saving...' : 'Save Grade'}
                        </button>
                        <a href="/admin/grades" className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 text-sm">Cancel</a>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
