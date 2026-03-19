import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { RefreshCw } from 'lucide-react'

const ALL_COURSE_NAMES = [
    'Introduction to Computing',
    'Computer Programming 1',
    'Computer Programming 2',
    'Computer Programming 3',
    'Data Structures and Algorithms',
    'Database Management Systems',
    'Web Development 1',
    'Web Development 2',
    'Web Development 3',
    'Mobile Application Development',
    'Systems Analysis and Design',
    'Software Engineering',
    'Operating Systems',
    'Computer Networks',
    'Network Administration',
    'Information Assurance and Security',
    'Cybersecurity Fundamentals',
    'Human Computer Interaction',
    'IT Project Management',
    'Capstone Project 1',
    'Capstone Project 2',
    'Practicum / OJT',
    'Technopreneurship',
    'Discrete Mathematics',
    'Mathematics in the Modern World',
    'Computer Hardware Fundamentals',
    'Technical Writing for IT',
    'Social Issues and Professional Practice',
    'Artificial Intelligence',
    'Machine Learning',
    'Cloud Computing',
    'Internet of Things',
    'Game Development',
    'Digital Forensics',
    'System Administration and Maintenance',
    'Object Oriented Programming',
    'Data Analytics',
    'Computer Graphics',
    'Compiler Design',
    'Algorithm Analysis',
]

const COURSE_PREFIXES = ['IT', 'CS', 'IS', 'ICT', 'CIS']

const generateCourseCode = (name, prefix) => {
    const words = name.split(' ')
    const initials = words
        .filter(w => w.length > 2)
        .slice(0, 3)
        .map(w => w[0].toUpperCase())
        .join('')
    const num = Math.floor(100 + Math.random() * 900)
    return `${prefix}${num}-${initials}`
}

export default function Create({ teachers, existingCourseNames }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        teacher_id: '',
        description: '',
        units: 3,
        status: 'active',
    })

    // Filter out already existing course names
    const availableCourseNames = ALL_COURSE_NAMES.filter(
        name => !existingCourseNames.includes(name)
    )

    const handleNameChange = (name) => {
        const prefix = COURSE_PREFIXES[Math.floor(Math.random() * COURSE_PREFIXES.length)]
        const code = generateCourseCode(name, prefix)
        setData(prev => ({ ...prev, name, code }))
    }

    const regenerateCode = () => {
        if (!data.name) return
        const prefix = COURSE_PREFIXES[Math.floor(Math.random() * COURSE_PREFIXES.length)]
        const code = generateCourseCode(data.name, prefix)
        setData('code', code)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/admin/courses')
    }

    return (
        <AdminLayout>
            <Head title="Add Course" />
            <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Course</h1>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Course Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                        <select
                            value={data.name}
                            onChange={e => handleNameChange(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-- Select Course --</option>
                            {availableCourseNames.length > 0 ? (
                                availableCourseNames.map(name => (
                                    <option key={name} value={name}>{name}</option>
                                ))
                            ) : (
                                <option disabled>All courses have been added</option>
                            )}
                        </select>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Course Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={data.code}
                                onChange={e => setData('code', e.target.value)}
                                placeholder="Auto-generated"
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                            />
                            <button
                                type="button"
                                onClick={regenerateCode}
                                title="Regenerate code"
                                className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 text-gray-600">
                                <RefreshCw size={16} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Auto-generated from course name. Click refresh to regenerate.</p>
                        {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
                    </div>

                    {/* Teacher */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                        <select
                            value={data.teacher_id}
                            onChange={e => setData('teacher_id', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-- Select Teacher --</option>
                            {teachers.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            rows={3}
                            placeholder="Enter course description..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* Units */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
                        <select
                            value={data.units}
                            onChange={e => setData('units', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value={1}>1 Unit</option>
                            <option value={2}>2 Units</option>
                            <option value={3}>3 Units</option>
                            <option value={4}>4 Units</option>
                            <option value={5}>5 Units</option>
                            <option value={6}>6 Units</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={data.status}
                            onChange={e => setData('status', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing}
                            className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 text-sm disabled:opacity-50">
                            {processing ? 'Saving...' : 'Save Course'}
                        </button>
                        <a href="/admin/courses" className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 text-sm">Cancel</a>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}