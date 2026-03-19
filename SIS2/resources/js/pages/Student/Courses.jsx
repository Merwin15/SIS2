import React from 'react'
import { Head } from '@inertiajs/react'
import StudentLayout from '@/layouts/StudentLayout'
import { BookOpen } from 'lucide-react'

export default function Courses({ enrollments }) {
    return (
        <StudentLayout>
            <Head title="My Courses" />
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h1>

                {enrollments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {enrollments.map((e) => (
                            <div key={e.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <BookOpen size={20} className="text-blue-600" />
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        e.status === 'enrolled' ? 'bg-green-100 text-green-700' :
                                        e.status === 'dropped' ? 'bg-red-100 text-red-700' :
                                        'bg-blue-100 text-blue-700'}`}>
                                        {e.status}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-1">{e.course?.name}</h3>
                                <p className="text-xs text-gray-400 mb-3">Code: {e.course?.code} • {e.course?.units} units</p>
                                <div className="border-t pt-3 flex items-center justify-between text-xs text-gray-500">
                                    <span>👨‍🏫 {e.course?.teacher?.name ?? 'No teacher assigned'}</span>
                                    <span>{e.semester} • {e.school_year}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-400">You are not enrolled in any courses yet.</p>
                        <p className="text-gray-400 text-sm mt-1">Please contact the admin to get enrolled.</p>
                    </div>
                )}
            </div>
        </StudentLayout>
    )
}