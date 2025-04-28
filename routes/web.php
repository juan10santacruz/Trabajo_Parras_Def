<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('teacher/dashboard', function () {
        return Inertia::render('TeacherDashboard');
    })->name('teacher.dashboard');

    Route::resource('institutions', App\Http\Controllers\InstitutionController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
