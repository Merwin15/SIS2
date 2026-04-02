import React, { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { GraduationCap, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import GoogleLogo from '@/assets/google.png'

export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/register')
    }

    const handleGoogleRegister = () => {
        window.location.href = '/auth/google'
    }

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full opacity-5 blur-3xl" />
                </div>
                <div className="w-full max-w-md relative">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                            <GraduationCap size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">ACADIFY</h1>
                        <p className="text-gray-400 mt-1">Create your student account</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-2xl p-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Student Registration</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="Juan Dela Cruz"
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        placeholder="Confirm your password"
                                        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
                                Your account will be registered as a Student account. Contact the admin if you need a different role.
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Creating account...' : 'Create Account'}
                            </button>
                        </form>
                        <div className="flex items-center gap-3 my-5">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs text-gray-400">or continue with</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>
                        <button
                            type="button"
                            onClick={handleGoogleRegister}
                            className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                        >
                            <img src={GoogleLogo} alt="Google" className="w-5 h-5" />
                            Sign up with Google
                        </button>
                        <p className="text-center text-sm text-gray-500 mt-6">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-600 font-medium hover:text-blue-700">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}