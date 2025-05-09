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

    Route::get('admin/dashboard', function () {
        return Inertia::render('AdminDashboard');
    })->name('admin.dashboard');

    Route::get('teacher/dashboard', function () {
        $user = auth()->user();
        $tests = $user->institutions()
            ->with(['tests' => function($query) {
                $query->select('tests.id', 'name', 'description');
            }])
            ->get()
            ->pluck('tests')
            ->flatten()
            ->unique('id')
            ->values();

        return Inertia::render('TeacherDashboard', [
            'auth' => [
                'user' => $user,
                'tests' => $tests
            ]
        ]);
    })->name('teacher.dashboard');

    // Rutas para la evaluación de profesores
    Route::get('teacher/evaluation/{test}', [App\Http\Controllers\TeacherEvaluationController::class, 'show'])
        ->name('teacher.evaluation.show');
    Route::post('teacher/evaluation/submit', [App\Http\Controllers\TeacherEvaluationController::class, 'submit'])
        ->name('teacher.evaluation.submit');

    Route::resource('institutions', App\Http\Controllers\InstitutionController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
