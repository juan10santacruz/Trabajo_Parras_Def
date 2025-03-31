<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CoordinatorSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::create([
            'name' => 'Coordinador',
            'lastname' => 'Principal',
            'phone' => '3001234567',
            'email' => 'coordinador@instituciones.com',
            'password' => Hash::make('coordinador123'),
            'email_verified_at' => now(), // Agregamos esta línea
        ]);

        $coordinatorRole = Role::where('slug', 'coordinator')->first();
        $user->roles()->attach($coordinatorRole);
    }
}