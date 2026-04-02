<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboard;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\EnrollmentController;
use App\Http\Controllers\Admin\GradeController;
use App\Http\Controllers\Student\DashboardController as StudentDashboard;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'auth' => ['user' => auth()->user()],
    ]);
});

// Breeze redirects here after login — we redirect based on role
Route::middleware('auth')->get('/dashboard', function () {
    if (auth()->user()->isAdmin()) {
        return redirect('/admin/dashboard');
    }
    return redirect('/student/dashboard');
})->name('dashboard');

// Admin routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboard::class, 'index'])->name('dashboard');
    Route::resource('students', StudentController::class);
    Route::resource('teachers', TeacherController::class);
    Route::resource('courses', CourseController::class);
    Route::resource('enrollments', EnrollmentController::class);
    Route::resource('grades', GradeController::class);
});
// Student routes
Route::middleware(['auth', 'role:student'])->prefix('student')->name('student.')->group(function () {
    Route::get('/dashboard', [StudentDashboard::class, 'index'])->name('dashboard');
    Route::get('/courses', [StudentDashboard::class, 'courses'])->name('courses');
    Route::get('/courses/{enrollment}', [StudentDashboard::class, 'courseDetail'])->name('courses.show');
    Route::get('/grades', [StudentDashboard::class, 'grades'])->name('grades');
    Route::get('/profile', [StudentDashboard::class, 'profile'])->name('profile');
    Route::put('/profile', [StudentDashboard::class, 'updateProfile'])->name('profile.update');
});
// Google Auth
Route::get('/auth/google', [App\Http\Controllers\Auth\GoogleController::class, 'redirect'])->name('google.redirect');
Route::get('/auth/google/callback', [App\Http\Controllers\Auth\GoogleController::class, 'callback'])->name('google.callback');
require __DIR__.'/auth.php';