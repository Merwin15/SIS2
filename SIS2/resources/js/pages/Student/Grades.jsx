import React from 'react'
import { Head } from '@inertiajs/react'
import StudentLayout from '@/layouts/StudentLayout'
import { Star, TrendingUp } from 'lucide-react'

export default function Grades({ grades, gpa }) {
    const getGradeColor = (grade) => {
        const g = Number(grade)
        if (g <= 3.0) return 'text-green-600'
        return 'text-red-600'
    }

    const getGradeBadge = (grade) => {
        const g = Number(grade)
        if (g <= 1.0) return { label: 'Excellent', class: 'bg-green-100 text-green-700' }
        if (g <= 1.5) return { label: 'Very Good', class: 'bg-green-100 text-green-700' }
        if (g <= 2.0) return { label: 'Good', class: 'bg-blue-100 text-blue-700' }
        if (g <= 2.5) return { label: 'Satisfactory', class: 'bg-blue-100 text-blue-700' }
        if (g <= 3.0) return { label: 'Passed', class: 'bg-yellow-100 text-yellow-700' }
        return { label: 'Failed', class: 'bg-red-100 text-red-700' }
    }

    const passedCount = grades.filter(g => Number(g.grade) <= 3.0).length
    const failedCount = grades.filter(g => Number(g.grade) > 3.0).length

    return (
        <StudentLayout>
            <Head title="My Grades" />

            {/* GPA Card */}
            {gpa && (
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 mb-6 text-white flex items-center justify-between">
                    <div>
                        <p className="text-blue-200 text-sm mb-1">Overall GWA</p>
                        <p className="text-5xl font-bold">{gpa}</p>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-green-300 text-sm">✓ {passedCount} Passed</span>
                            <span className="text-red-300 text-sm">✗ {failedCount} Failed</span>
                        </div>
                    </div>
                    <TrendingUp size={64} className="text-white opacity-20" />
                </div>
            )}

            {/* Grading Legend */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Grading Scale</p>
                <div className="flex flex-wrap gap-2 text-xs">
                    {[
                        { label: '1.0 — Excellent', class: 'bg-green-100 text-green-700' },
                        { label: '1.25 - 1.5 — Very Good', class: 'bg-green-100 text-green-700' },
                        { label: '1.75 - 2.0 — Good', class: 'bg-blue-100 text-blue-700' },
                        { label: '2.25 - 2.5 — Satisfactory', class: 'bg-blue-100 text-blue-700' },
                        { label: '2.75 - 3.0 — Passed', class: 'bg-yellow-100 text-yellow-700' },
                        { label: '5.0 — Failed', class: 'bg-red-100 text-red-700' },
                    ].map(item => (
                        <span key={item.label} className={`px-2 py-1 rounded-full ${item.class}`}>
                            {item.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Grades Table */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Grades</h1>

                {grades.length > 0 ? (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500 border-b">
                                <th className="pb-3">Course</th>
                                <th className="pb-3">Semester</th>
                                <th className="pb-3">Grade</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((g) => {
                                const badge = getGradeBadge(g.grade)
                                return (
                                    <tr key={g.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="py-3 font-medium text-gray-800">{g.enrollment?.course?.name}</td>
                                        <td className="py-3 text-gray-500">{g.enrollment?.semester}</td>
                                        <td className={`py-3 font-bold text-xl ${getGradeColor(g.grade)}`}>
                                            {Number(g.grade).toFixed(2)}
                                        </td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${badge.class}`}>
                                                {badge.label}
                                            </span>
                                        </td>
                                        <td className="py-3 text-gray-400">{g.remarks ?? 'N/A'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-16">
                        <Star size={48} className="text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-400">No grades available yet.</p>
                        <p className="text-gray-400 text-sm mt-1">Your grades will appear here once the admin submits them.</p>
                    </div>
                )}
            </div>
        </StudentLayout>
    )
}