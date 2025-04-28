<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::create([
            'name' => 'Administrador',
            'lastname' => 'Principal',
            'phone' => '3001234567',
            'email' => 'admin@instituciones.com',
            'password' => Hash::make('admin123'),
            'email_verified_at' => now(),
        ]);

        $adminRole = Role::where('slug', 'admin')->first();
        $user->roles()->attach($adminRole);
    }
}