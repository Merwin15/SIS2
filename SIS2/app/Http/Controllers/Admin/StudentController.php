<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $students = User::where('role', 'student')
            ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%"))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'filters'  => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Students/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);

        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'student',
        ]);

        return redirect()->route('admin.students.index')->with('success', 'Student created successfully.');
    }

    public function show(User $student)
    {
        return Inertia::render('Admin/Students/Show', [
            'student' => $student->load('enrollments.course'),
        ]);
    }

    public function edit(User $student)
    {
        return Inertia::render('Admin/Students/Edit', [
            'student' => $student,
        ]);
    }

    public function update(Request $request, User $student)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $student->id,
        ]);

        $student->update($request->only('name', 'email'));

        return redirect()->route('admin.students.index')->with('success', 'Student updated successfully.');
    }

    public function destroy(User $student)
    {
        $student->delete();
        return redirect()->route('admin.students.index')->with('success', 'Student deleted successfully.');
    }
}