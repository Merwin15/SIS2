import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'

export default function Edit({ grade, enrollments }) {
    const { data, setData, put, processing, errors } = useForm({
        enrollment_id: grade.enrollment_id,
        grade: grade.grade,
        remarks: grade.remarks ?? '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/admin/grades/${grade.id}`)
    }

    return (
        <AdminLayout>
            <Head title="Edit Grade" />
            <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Grade</h1>
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
                        <select value={data.grade} onChange={e => setData('grade', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-- Select Grade --</option>
                            <option value="1.0">1.0 — Excellent</option>
                            <option value="1.25">1.25 — Very Good</option>
                            <option value="1.5">1.5 — Very Good</option>
                            <option value="1.75">1.75 — Good</option>
                            <option value="2.0">2.0 — Good</option>
                            <option value="2.25">2.25 — Satisfactory</option>
                            <option value="2.5">2.5 — Satisfactory</option>
                            <option value="2.75">2.75 — Passed</option>
                            <option value="3.0">3.0 — Passed</option>
                            <option value="5.0">5.0 — Failed</option>
                        </select>
                        {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Remarks <span className="text-gray-400 font-normal">(optional)</span></label>
                        <input type="text" value={data.remarks} onChange={e => setData('remarks', e.target.value)}
                            placeholder="e.g. Incomplete, Good standing..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 text-sm disabled:opacity-50">
                            {processing ? 'Saving...' : 'Update Grade'}
                        </button>
                        <a href="/admin/grades" className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 text-sm">Cancel</a>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}