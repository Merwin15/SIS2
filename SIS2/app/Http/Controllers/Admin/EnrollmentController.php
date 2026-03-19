<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\User;
use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    public function index(Request $request)
    {
        $enrollments = Enrollment::with(['student', 'course', 'teacher'])
            ->when($request->search, fn($q) => $q->whereHas('student', fn($q) => $q->where('name', 'like', "%{$request->search}%")))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Enrollments/Index', [
            'enrollments' => $enrollments,
            'filters'     => $request->only('search'),
        ]);
    }

   public function create()
{
    return Inertia::render('Admin/Enrollments/Create', [
        'students' => User::where('role', 'student')->get(['id', 'name']),
        'courses'  => Course::where('status', 'active')->get(['id', 'name', 'code', 'teacher_id']),
        'teachers' => Teacher::where('status', 'active')->get(['id', 'name']),
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'student_id'  => 'required|exists:users,id',
            'course_id'   => 'required|exists:courses,id',
            'teacher_id'  => 'nullable|exists:teachers,id',
            'semester'    => 'required|string',
            'school_year' => 'required|string',
            'status'      => 'required|in:enrolled,dropped,completed',
        ]);

        Enrollment::create($request->all());

        return redirect()->route('admin.enrollments.index')->with('success', 'Enrollment created successfully.');
    }

    public function show(Enrollment $enrollment)
    {
        return Inertia::render('Admin/Enrollments/Show', [
            'enrollment' => $enrollment->load('student', 'course', 'teacher', 'grades'),
        ]);
    }

    public function edit(Enrollment $enrollment)
{
    return Inertia::render('Admin/Enrollments/Edit', [
        'enrollment' => $enrollment,
        'students'   => User::where('role', 'student')->get(['id', 'name']),
        'courses'    => Course::where('status', 'active')->get(['id', 'name', 'code', 'teacher_id']),
        'teachers'   => Teacher::where('status', 'active')->get(['id', 'name']),
    ]);
}

    public function update(Request $request, Enrollment $enrollment)
    {
        $request->validate([
            'student_id'  => 'required|exists:users,id',
            'course_id'   => 'required|exists:courses,id',
            'teacher_id'  => 'nullable|exists:teachers,id',
            'semester'    => 'required|string',
            'school_year' => 'required|string',
            'status'      => 'required|in:enrolled,dropped,completed',
        ]);

        $enrollment->update($request->all());

        return redirect()->route('admin.enrollments.index')->with('success', 'Enrollment updated successfully.');
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();
        return redirect()->route('admin.enrollments.index')->with('success', 'Enrollment deleted successfully.');
    }
}