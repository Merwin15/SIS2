<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Grade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        $enrollments = Enrollment::with(['course.teacher', 'grades'])
            ->where('student_id', $user->id)
            ->get();

        $grades = Grade::whereHas('enrollment', fn($q) => $q->where('student_id', $user->id))
            ->with('enrollment.course')
            ->get();

        $gpa = $grades->count() > 0
            ? round($grades->avg('grade'), 2)
            : null;

        return Inertia::render('Student/Dashboard', [
            'student'     => $user,
            'enrollments' => $enrollments,
            'grades'      => $grades,
            'gpa'         => $gpa,
            'stats'       => [
                'total_enrolled'  => $enrollments->count(),
                'total_grades'    => $grades->count(),
                'gpa'             => $gpa,
                'completed'       => $enrollments->where('status', 'completed')->count(),
            ],
        ]);
    }

    public function courses(): Response
    {
        $enrollments = Enrollment::with(['course.teacher'])
            ->where('student_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Student/Courses', [
            'enrollments' => $enrollments,
        ]);
    }

    public function grades(): Response
    {
        $grades = Grade::whereHas('enrollment', fn($q) => $q->where('student_id', auth()->id()))
            ->with(['enrollment.course'])
            ->get();

        $gpa = $grades->count() > 0 ? round($grades->avg('grade'), 2) : null;

        return Inertia::render('Student/Grades', [
            'grades' => $grades,
            'gpa'    => $gpa,
        ]);
    }

    public function profile(): Response
    {
        return Inertia::render('Student/Profile', [
            'student' => auth()->user(),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'name'                  => 'required|string|max:255',
            'email'                 => 'required|email|unique:users,email,' . $user->id,
            'current_password'      => 'nullable|string',
            'password'              => 'nullable|min:8|confirmed',
        ]);

        if ($request->current_password) {
            if (!Hash::check($request->current_password, $user->password)) {
                return back()->withErrors(['current_password' => 'Current password is incorrect.']);
            }
        }

        $user->update([
            'name'  => $request->name,
            'email' => $request->email,
        ]);

        if ($request->password) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        return back()->with('success', 'Profile updated successfully.');
    }
}