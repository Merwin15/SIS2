import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'

export default function Edit({ teacher }) {
    const { data, setData, put, processing, errors } = useForm({
        name: teacher.name,
        email: teacher.email,
        employee_id: teacher.employee_id,
        department: teacher.department ?? '',
        phone: teacher.phone ?? '',
        status: teacher.status,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/admin/teachers/${teacher.id}`)
    }

    return (
        <AdminLayout>
            <Head title="Edit Teacher" />
            <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Teacher</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: 'Name', key: 'name', type: 'text' },
                        { label: 'Email', key: 'email', type: 'email' },
                        { label: 'Employee ID', key: 'employee_id', type: 'text' },
                        { label: 'Department', key: 'department', type: 'text' },
                        { label: 'Phone', key: 'phone', type: 'text' },
                    ].map(({ label, key, type }) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                            <input type={type} value={data[key]} onChange={e => setData(key, e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                        </div>
                    ))}
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
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-sm disabled:opacity-50">
                            {processing ? 'Saving...' : 'Update Teacher'}
                        </button>
                        <a href="/admin/teachers" className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 text-sm">Cancel</a>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}