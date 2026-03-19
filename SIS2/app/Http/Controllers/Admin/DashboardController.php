<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use App\Models\Teacher;
use App\Models\Enrollment;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_students'    => User::where('role', 'student')->count(),
                'total_teachers'    => Teacher::count(),
                'total_courses'     => Course::count(),
                'total_enrollments' => Enrollment::count(),
            ],
            'recentStudents' => User::where('role', 'student')
                ->latest()
                ->take(5)
                ->get(['id', 'name', 'email', 'created_at']),
            'recentEnrollments' => Enrollment::with(['student', 'course'])
                ->latest()
                ->take(5)
                ->get(),
            'monthlyEnrollments' => Enrollment::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
                ->whereYear('created_at', date('Y'))
                ->groupBy('month')
                ->orderBy('month')
                ->get(),
        ]);
    }
}