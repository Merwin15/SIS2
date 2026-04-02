import React, { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import GoogleLogo from '@/assets/google.png'

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false)
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/login')
    }

    const handleGoogleLogin = () => {
        window.location.href = '/auth/google'
    }

    return (
        <>
            <Head title="Login" />
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
                        <h1 className="text-3xl font-bold text-white">ACADIFY Portal</h1>
                        <p className="text-gray-400 mt-1">Student Information System</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-2xl p-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Welcome back</h2>
                        {status && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                                {status}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-5">
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
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                        className="rounded border-gray-300 text-blue-600"
                                    />
                                    Remember me
                                </label>
                                {canResetPassword && (
                                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>
                        <div className="flex items-center gap-3 my-5">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs text-gray-400">or continue with</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                        >
                            <img src={GoogleLogo} alt="Google" className="w-5 h-5" />
                            Sign in with Google
                        </button>
                        <p className="text-center text-sm text-gray-500 mt-6">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-blue-600 font-medium hover:text-blue-700">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}