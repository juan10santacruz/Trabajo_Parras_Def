<?php

namespace App\Http\Controllers;

use App\Models\Institution;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Role;

class InstitutionController extends Controller
{
    public function index()
    {
        $institutions = Institution::all();
        return Inertia::render('Institutions/Index', [
            'institutions' => $institutions
        ]);
    }

    public function create()
    {   
        $teacherRole = Role::where('slug', 'teacher')->first();
        $teachers = User::whereHas('roles', function($query) use ($teacherRole) {
            $query->where('id', $teacherRole->id);
        })->get();

        $tests = \App\Models\Test::all();

        return Inertia::render('Institutions/Create', [
            'teachers' => $teachers,
            'tests' => $tests
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'institution_type' => 'required|string|max:50',
            'country' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'teachers' => 'array',
            'tests' => 'array'
        ]);

        $teachers = $validated['teachers'] ?? [];
        $tests = $validated['tests'] ?? [];
        unset($validated['teachers'], $validated['tests']);

        $institution = Institution::create($validated);
        $institution->users()->attach($teachers);
        $institution->tests()->attach($tests);

        // Sincronizar la relación entre usuarios (profesores) y tests
        foreach ($teachers as $userId) {
            $user = User::find($userId);
            if ($user) {
                $user->tests()->syncWithoutDetaching($tests);
            }
        }

        return redirect()->route('institutions.index')
            ->with('message', 'Institución creada exitosamente');
    }

    public function edit(Institution $institution)
    {
        $teacherRole = Role::where('slug', 'teacher')->first();
        $teachers = User::whereHas('roles', function($query) use ($teacherRole) {
            $query->where('id', $teacherRole->id);
        })->get();

        $tests = \App\Models\Test::all();

        return Inertia::render('Institutions/Edit', [
            'institution' => $institution->load(['users', 'tests']),
            'teachers' => $teachers,
            'tests' => $tests
        ]);
    }

    public function update(Request $request, Institution $institution)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'institution_type' => 'required|string|max:50',
            'country' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'teachers' => 'array',
            'tests' => 'array'
        ]);

        $teachers = $validated['teachers'] ?? [];
        $tests = $validated['tests'] ?? [];
        unset($validated['teachers'], $validated['tests']);

        $institution->update($validated);
        $institution->users()->sync($teachers);
        $institution->tests()->sync($tests);

        // Sincronizar la relación entre usuarios (profesores) y tests
        foreach ($teachers as $userId) {
            $user = User::find($userId);
            if ($user) {
                $user->tests()->syncWithoutDetaching($tests);
            }
        }

        return redirect()->route('institutions.index')
            ->with('message', 'Institución actualizada exitosamente');
    }

    public function destroy(Institution $institution)
    {
        // Obtener los usuarios y tests asociados antes de eliminar
        $users = $institution->users;
        $tests = $institution->tests;

        // Eliminar las relaciones en test_user para los usuarios de esta institución
        foreach ($users as $user) {
            $user->tests()->detach($tests);
        }

        // Eliminar la institución (esto eliminará automáticamente las relaciones en institution_test e institution_user)
        $institution->delete();

        return redirect()->route('institutions.index')
            ->with('message', 'Institución eliminada exitosamente');
    }
}