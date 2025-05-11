<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Test;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherEvaluationController extends Controller
{
    public function show(Test $test)
    {
        $user = auth()->user();
        
        // Verificar que el profesor tenga acceso a este test
        $hasAccess = $user->institutions()
            ->whereHas('tests', function($query) use ($test) {
                $query->where('tests.id', $test->id);
            })
            ->exists();

        if (!$hasAccess) {
            abort(403, 'No tienes acceso a esta evaluación.');
        }

        // Verificar si el profesor ya respondió este test
        $hasAnswered = Answer::where('user_id', $user->id)
            ->whereHas('question', function($query) use ($test) {
                $query->where('test_id', $test->id);
            })
            ->exists();

        if ($hasAnswered) {
            return redirect()->route('teacher.dashboard')
                ->with('message', 'Ya has completado esta evaluación anteriormente.');
        }

        return Inertia::render('TeacherEvaluation/Index', [
            'test' => $test->load('questions')
        ]);
    }

    public function submit(Request $request)
    {
        $validated = $request->validate([
            'test_id' => 'required|exists:tests,id',
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.value' => 'required|in:' . implode(',', Answer::$values)
        ]);

        $user = auth()->user();

        // Verificar que el profesor tenga acceso a este test
        $hasAccess = $user->institutions()
            ->whereHas('tests', function($query) use ($validated) {
                $query->where('tests.id', $validated['test_id']);
            })
            ->exists();

        if (!$hasAccess) {
            abort(403, 'No tienes acceso a esta evaluación.');
        }

        // Verificar si el profesor ya respondió este test
        $hasAnswered = Answer::where('user_id', $user->id)
            ->whereHas('question', function($query) use ($validated) {
                $query->where('test_id', $validated['test_id']);
            })
            ->exists();

        if ($hasAnswered) {
            return redirect()->route('teacher.dashboard')
                ->with('message', 'Ya has completado esta evaluación anteriormente.');
        }

        // Guardar las respuestas
        foreach ($validated['answers'] as $answer) {
            Answer::create([
                'question_id' => $answer['question_id'],
                'user_id' => $user->id,
                'value' => $answer['value']
            ]);
        }

        return redirect()->route('teacher.dashboard')
            ->with('message', 'Evaluación completada exitosamente');
    }
}