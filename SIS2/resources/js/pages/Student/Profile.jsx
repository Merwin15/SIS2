import React, { useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import StudentLayout from '@/layouts/StudentLayout'
import { User, Mail, Lock, Eye, EyeOff, Save } from 'lucide-react'

export default function Profile({ student }) {
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const { data, setData, put, processing, errors } = useForm({
        name: student.name,
        email: student.email,
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put('/student/profile')
    }

    return (
        <StudentLayout>
            <Head title="My Profile" />
            <div className="max-w-2xl">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 mb-6 text-white flex items-center gap-5">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
                        {student.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{student.name}</h1>
                        <p className="text-blue-200">{student.email}</p>
                        <span className="inline-block mt-2 bg-white/20 text-white text-xs px-3 py-1 rounded-full capitalize">
                            {student.role}
                        </span>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Edit Profile</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="border-t pt-5">
                            <p className="text-sm font-medium text-gray-700 mb-4">Change Password <span className="text-gray-400 font-normal">(leave blank to keep current)</span></p>

                            {/* Current Password */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type={showCurrent ? 'text' : 'password'} value={data.current_password}
                                        onChange={e => setData('current_password', e.target.value)}
                                        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.current_password && <p className="text-red-500 text-xs mt-1">{errors.current_password}</p>}
                            </div>

                            {/* New Password */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type={showNew ? 'text' : 'password'} value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <button type="button" onClick={() => setShowNew(!showNew)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type={showConfirm ? 'text' : 'password'} value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={processing}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
                            <Save size={16} />
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </StudentLayout>
    )
}