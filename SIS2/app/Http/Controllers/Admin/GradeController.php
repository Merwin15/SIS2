<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradeController extends Controller
{
    public function index(Request $request)
    {
        $grades = Grade::with(['enrollment.student', 'enrollment.course'])
            ->when($request->search, fn($q) => $q->whereHas('enrollment.student', fn($q) => $q->where('name', 'like', "%{$request->search}%")))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Grades/Index', [
            'grades'  => $grades,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Grades/Create', [
            'enrollments' => Enrollment::with(['student', 'course'])->get(),
        ]);
    }

   public function store(Request $request)
{
    $request->validate([
        'enrollment_id' => 'required|exists:enrollments,id',
        'grade'         => 'required|numeric|min:1.0|max:5.0',
        'remarks'       => 'nullable|string',
    ]);

    Grade::create($request->all());

    return redirect()->route('admin.grades.index')->with('success', 'Grade added successfully.');
}


    public function show(Grade $grade)
    {
        return Inertia::render('Admin/Grades/Show', [
            'grade' => $grade->load('enrollment.student', 'enrollment.course'),
        ]);
    }

    public function edit(Grade $grade)
    {
        return Inertia::render('Admin/Grades/Edit', [
            'grade'       => $grade,
            'enrollments' => Enrollment::with(['student', 'course'])->get(),
        ]);
    }

   public function update(Request $request, Grade $grade)
{
    $request->validate([
        'enrollment_id' => 'required|exists:enrollments,id',
        'grade'         => 'required|numeric|min:1.0|max:5.0',
        'remarks'       => 'nullable|string',
    ]);

    $grade->update($request->all());

    return redirect()->route('admin.grades.index')->with('success', 'Grade updated successfully.');
}

    public function destroy(Grade $grade)
    {
        $grade->delete();
        return redirect()->route('admin.grades.index')->with('success', 'Grade deleted successfully.');
    }
}