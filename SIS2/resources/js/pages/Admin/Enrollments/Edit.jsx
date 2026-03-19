import React, { useState, useEffect } from 'react'
import { Head, useForm } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Lock } from 'lucide-react'

export default function Edit({ enrollment, students, courses, teachers }) {
    const [lockedTeacher, setLockedTeacher] = useState(false)
    const [lockedTeacherName, setLockedTeacherName] = useState('')

    const { data, setData, put, processing, errors } = useForm({
        student_id: enrollment.student_id,
        course_id: enrollment.course_id,
        teacher_id: enrollment.teacher_id ?? '',
        semester: enrollment.semester,
        school_year: enrollment.school_year,
        status: enrollment.status,
    })

    // Check on load if course already has a teacher assigned
    useEffect(() => {
        const selectedCourse = courses.find(c => c.id == enrollment.course_id)
        if (selectedCourse?.teacher_id) {
            const teacher = teachers.find(t => t.id == selectedCourse.teacher_id)
            setLockedTeacherName(teacher?.name ?? '')
            setLockedTeacher(true)
        }
    }, [])

    const handleCourseChange = (courseId) => {
        setData('course_id', courseId)
        const selectedCourse = courses.find(c => c.id == courseId)

        if (selectedCourse?.teacher_id) {
            setData('teacher_id', selectedCourse.teacher_id)
            const teacher = teachers.find(t => t.id == selectedCourse.teacher_id)
            setLockedTeacherName(teacher?.name ?? '')
            setLockedTeacher(true)
        } else {
            setData('teacher_id', '')
            setLockedTeacherName('')
            setLockedTeacher(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/admin/enrollments/${enrollment.id}`)
    }

    return (
        <AdminLayout>
            <Head title="Edit Enrollment" />
            <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Enrollment</h1>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Student */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                        <select value={data.student_id} onChange={e => setData('student_id', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-- Select Student --</option>
                            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                        {errors.student_id && <p className="text-red-500 text-xs mt-1">{errors.student_id}</p>}
                    </div>

                    {/* Course */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                        <select value={data.course_id} onChange={e => handleCourseChange(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-- Select Course --</option>
                            {courses.map(c => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
                        </select>
                        {errors.course_id && <p className="text-red-500 text-xs mt-1">{errors.course_id}</p>}
                    </div>

                    {/* Instructor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Instructor
                            {lockedTeacher && (
                                <span className="ml-2 inline-flex items-center gap-1 text-xs text-green-600 font-normal">
                                    <Lock size={12} /> Auto-assigned from course
                                </span>
                            )}
                        </label>
                        {lockedTeacher ? (
                            <div className="w-full border border-green-300 bg-green-50 rounded-lg px-3 py-2 text-sm text-green-800 flex items-center justify-between">
                                <span>{lockedTeacherName}</span>
                                <Lock size={14} className="text-green-500" />
                            </div>
                        ) : (
                            <select value={data.teacher_id} onChange={e => setData('teacher_id', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">-- Select Instructor --</option>
                                {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        )}
                        {errors.teacher_id && <p className="text-red-500 text-xs mt-1">{errors.teacher_id}</p>}
                    </div>

                    {/* Semester */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                        <select value={data.semester} onChange={e => setData('semester', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-- Select Semester --</option>
                            <option value="1st Semester">1st Semester</option>
                            <option value="2nd Semester">2nd Semester</option>
                            <option value="Summer">Summer</option>
                        </select>
                        {errors.semester && <p className="text-red-500 text-xs mt-1">{errors.semester}</p>}
                    </div>

                    {/* School Year */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">School Year</label>
                        <input type="text" value={data.school_year}
                            onChange={e => setData('school_year', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.school_year && <p className="text-red-500 text-xs mt-1">{errors.school_year}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select value={data.status} onChange={e => setData('status', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="enrolled">Enrolled</option>
                            <option value="dropped">Dropped</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 text-sm disabled:opacity-50">
                            {processing ? 'Saving...' : 'Update Enrollment'}
                        </button>
                        <a href="/admin/enrollments" className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 text-sm">Cancel</a>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}