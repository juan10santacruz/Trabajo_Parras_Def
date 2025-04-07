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

        return Inertia::render('Institutions/Create', [
            'teachers' => $teachers
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
            'teachers' => 'array'
        ]);

        $teachers = $validated['teachers'] ?? [];
        unset($validated['teachers']);

        $institution = Institution::create($validated);
        $institution->users()->attach($teachers);

        return redirect()->route('institutions.index')
            ->with('message', 'Institución creada exitosamente');
    }

    public function edit(Institution $institution)
    {
        return Inertia::render('Institutions/Edit', [
            'institution' => $institution
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
        ]);

        $institution->update($validated);

        return redirect()->route('institutions.index')
            ->with('message', 'Institución actualizada exitosamente');
    }

    public function destroy(Institution $institution)
    {
        $institution->delete();

        return redirect()->route('institutions.index')
            ->with('message', 'Institución eliminada exitosamente');
    }
}