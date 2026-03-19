import React from 'react'
import { Head, Link } from '@inertiajs/react'
import StudentLayout from '@/layouts/StudentLayout'
import { ArrowLeft, BookOpen, User, Hash, Star, Calendar } from 'lucide-react'

export default function CourseDetail({ enrollment }) {
    const course = enrollment.course
    const teacher = course?.teacher
    const grades = enrollment.grades ?? []

    const getGradeBadge = (grade) => {
        const g = Number(grade)
        if (g <= 1.0) return { label: 'Excellent', class: 'bg-green-100 text-green-700' }
        if (g <= 1.5) return { label: 'Very Good', class: 'bg-green-100 text-green-700' }
        if (g <= 2.0) return { label: 'Good', class: 'bg-blue-100 text-blue-700' }
        if (g <= 2.5) return { label: 'Satisfactory', class: 'bg-blue-100 text-blue-700' }
        if (g <= 3.0) return { label: 'Passed', class: 'bg-yellow-100 text-yellow-700' }
        return { label: 'Failed', class: 'bg-red-100 text-red-700' }
    }

    return (
        <StudentLayout>
            <Head title={course?.name} />

            {/* Back button */}
            <div className="mb-4">
                <Link href="/student/courses" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                    <ArrowLeft size={16} /> Back to My Courses
                </Link>
            </div>

            {/* Course Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 mb-6 text-white">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <BookOpen size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold mb-1">{course?.name}</h1>
                        <p className="text-blue-200 text-sm">{course?.code} • {course?.units} units</p>
                        <div className="flex items-center gap-4 mt-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                enrollment.status === 'enrolled' ? 'bg-green-500 text-white' :
                                enrollment.status === 'dropped' ? 'bg-red-500 text-white' :
                                'bg-blue-500 text-white'}`}>
                                {enrollment.status}
                            </span>
                            <span className="text-blue-200 text-xs">{enrollment.semester} • {enrollment.school_year}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Course Info */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Information</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                <Hash size={16} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Course Code</p>
                                <p className="font-medium text-gray-800">{course?.code}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                                <User size={16} className="text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Instructor</p>
                                <p className="font-medium text-gray-800">{teacher?.name ?? 'Not assigned'}</p>
                                {teacher?.department && (
                                    <p className="text-xs text-gray-400">{teacher.department}</p>
                                )}
                                {teacher?.email && (
                                    <p className="text-xs text-blue-500">{teacher.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center shrink-0">
                                <Star size={16} className="text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Units</p>
                                <p className="font-medium text-gray-800">{course?.units} units</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                <Calendar size={16} className="text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Semester & School Year</p>
                                <p className="font-medium text-gray-800">{enrollment.semester}</p>
                                <p className="text-xs text-gray-400">{enrollment.school_year}</p>
                            </div>
                        </div>

                        {course?.description && (
                            <div className="border-t pt-4">
                                <p className="text-xs text-gray-400 mb-1">Description</p>
                                <p className="text-sm text-gray-700">{course.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Grades */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">My Grade</h2>
                    {grades.length > 0 ? (
                        <div className="space-y-3">
                            {grades.map((g) => {
                                const badge = getGradeBadge(g.grade)
                                return (
                                    <div key={g.id} className="border border-gray-200 rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.class}`}>
                                                {badge.label}
                                            </span>
                                            <span className={`text-3xl font-bold ${Number(g.grade) <= 3.0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {Number(g.grade).toFixed(2)}
                                            </span>
                                        </div>
                                        {g.remarks && (
                                            <p className="text-xs text-gray-500 mt-2">
                                                Remarks: {g.remarks}
                                            </p>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Star size={36} className="text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-400 text-sm">No grade submitted yet.</p>
                            <p className="text-gray-400 text-xs mt-1">Your grade will appear here once your instructor submits it.</p>
                        </div>
                    )}
                </div>
            </div>
        </StudentLayout>
    )
}