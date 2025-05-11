<?php

namespace App\Http\Controllers;

use App\Models\Test;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        // Obtener los tests disponibles para el profesor
        $tests = Test::whereHas('institutions', function($query) use ($user) {
            $query->whereIn('institutions.id', $user->institutions->pluck('id'));
        })
        ->with(['answers' => function($query) use ($user) {
            $query->where('user_id', $user->id);
        }])
        ->get()
        ->map(function($test) {
            // Verificar si el test está completado
            $is_completed = $test->answers->isNotEmpty();
            
            return [
                'id' => $test->id,
                'name' => $test->name,
                'is_completed' => $is_completed
            ];
        });

        return Inertia::render('Teacher/Dashboard', [
            'tests' => $tests,
            'message' => session('message')
        ]);
    }
}