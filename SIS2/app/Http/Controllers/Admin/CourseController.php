<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $courses = Course::with('teacher')
            ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%")
                ->orWhere('code', 'like', "%{$request->search}%"))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Courses/Index', [
            'courses' => $courses,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
{
    return Inertia::render('Admin/Courses/Create', [
        'teachers'            => Teacher::all(['id', 'name']),
        'existingCourseNames' => Course::pluck('name')->toArray(),
    ]);
}

   public function store(Request $request)
{
    $request->validate([
        'name'       => 'required|string|max:255|unique:courses,name',
        'code'       => 'required|unique:courses',
        'teacher_id' => 'nullable|exists:teachers,id',
        'units'      => 'required|integer',
        'status'     => 'required|in:active,inactive',
    ]);

    Course::create([
        'name'        => $request->name,
        'code'        => $request->code,
        'teacher_id'  => $request->teacher_id ? (int) $request->teacher_id : null,
        'description' => $request->description,
        'units'       => (int) $request->units,
        'status'      => $request->status,
    ]);

    return redirect()->route('admin.courses.index')->with('success', 'Course created successfully.');
}

    public function show(Course $course)
    {
        return Inertia::render('Admin/Courses/Show', [
            'course' => $course->load('teacher', 'enrollments.student'),
        ]);
    }

    public function edit(Course $course)
    {
        return Inertia::render('Admin/Courses/Edit', [
            'course'   => $course,
            'teachers' => Teacher::all(['id', 'name']),
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $request->validate([
            'name'       => 'required|string|max:255',
            'code'       => 'required|unique:courses,code,' . $course->id,
            'teacher_id' => 'nullable|exists:teachers,id',
            'units'      => 'required|integer',
            'status'     => 'required|in:active,inactive',
        ]);

        $course->update([
            'name'        => $request->name,
            'code'        => $request->code,
            'teacher_id'  => $request->teacher_id ? (int) $request->teacher_id : null,
            'description' => $request->description,
            'units'       => (int) $request->units,
            'status'      => $request->status,
        ]);

        return redirect()->route('admin.courses.index')->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('admin.courses.index')->with('success', 'Course deleted successfully.');
    }
}