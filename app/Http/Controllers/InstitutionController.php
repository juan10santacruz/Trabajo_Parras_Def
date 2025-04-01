<?php

namespace App\Http\Controllers;

use App\Models\Institution;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

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
        return Inertia::render('Institutions/Create');
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
        ]);

        Institution::create($validated);

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