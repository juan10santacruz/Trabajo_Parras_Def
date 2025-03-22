<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::create([
            'name' => 'Administrador',
            'slug' => 'admin'
        ]);

        Role::create([
            'name' => 'Coordinador',
            'slug' => 'coordinator'
        ]);

        Role::create([
            'name' => 'Profesor',
            'slug' => 'teacher'
        ]);
    }
}