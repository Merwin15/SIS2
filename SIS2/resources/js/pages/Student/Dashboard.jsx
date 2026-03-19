import React from 'react'
import { Head } from '@inertiajs/react'

export default function Dashboard() {
    return (
        <>
            <Head title="Student Dashboard" />
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto py-10 px-4">
                    <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
                    <p className="text-gray-500 mt-2">Welcome, Student!</p>
                </div>
            </div>
        </>
    )
}