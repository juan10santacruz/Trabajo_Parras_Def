<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    /**
     * Mostrar todos los tests
     */
    public function index(Request $request)
    {
        $tests = Test::with('questions')->get();
        
        if ($request->header('Accept') === 'application/json') {
            return response()->json([
                'data' => $tests->values()->all()
            ]);
        }
        
        return Inertia::render('Tests/Index', [
            'tests' => $tests
        ]);
    }

    /**
     * Mostrar formulario para crear un nuevo test
     */
    public function create()
    {
        return Inertia::render('Tests/Create');
    }

    /**
     * Almacenar un nuevo test con sus preguntas
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'required|array|min:1',
            'questions.*.text' => 'required|string|max:255',
        ]);

        DB::beginTransaction();

        try {
            $test = Test::create([
                'name' => $request->name,
                'description' => $request->description,
            ]);

            foreach ($request->questions as $index => $questionData) {
                $test->questions()->create([
                    'text' => $questionData['text'],
                    'order' => $index + 1,
                ]);
            }

            DB::commit();

            return redirect()->route('tests.index')
                ->with('success', 'Test creado correctamente');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Error al crear el test: ' . $e->getMessage());
        }
    }

    /**
     * Mostrar un test específico
     */
    public function show(Test $test)
    {
        $test->load('questions');
        
        return Inertia::render('Tests/Show', [
            'test' => $test
        ]);
    }

    /**
     * Mostrar formulario para editar un test
     */
    public function edit(Test $test)
    {
        $test->load('questions');
        
        return Inertia::render('Tests/Edit', [
            'test' => $test
        ]);
    }

    /**
     * Actualizar un test existente
     */
    public function update(Request $request, Test $test)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'required|array|min:1',
            'questions.*.id' => 'nullable|exists:questions,id',
            'questions.*.text' => 'required|string|max:255',
        ]);

        DB::beginTransaction();

        try {
            $test->update([
                'name' => $request->name,
                'description' => $request->description,
            ]);

            // Eliminar preguntas que no están en la solicitud
            $questionIds = collect($request->questions)
                ->pluck('id')
                ->filter()
                ->toArray();
            
            $test->questions()->whereNotIn('id', $questionIds)->delete();

            // Actualizar o crear preguntas
            foreach ($request->questions as $index => $questionData) {
                if (isset($questionData['id'])) {
                    Question::where('id', $questionData['id'])->update([
                        'text' => $questionData['text'],
                        'order' => $index + 1,
                    ]);
                } else {
                    $test->questions()->create([
                        'text' => $questionData['text'],
                        'order' => $index + 1,
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('tests.index')
                ->with('success', 'Test actualizado correctamente');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Error al actualizar el test: ' . $e->getMessage());
        }
    }

    /**
     * Eliminar un test
     */
    public function destroy(Test $test)
    {
        try {
            $test->delete();
            return redirect()->route('tests.index')
                ->with('success', 'Test eliminado correctamente');
        } catch (\Exception $e) {
            return back()->with('error', 'Error al eliminar el test: ' . $e->getMessage());
        }
    }
}