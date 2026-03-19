<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::create([
            'name'     => 'Admin',
            'email'    => 'admin@sis.com',
            'password' => bcrypt('password'),
            'role'     => 'admin',
        ]);

        // Student user
        User::create([
            'name'     => 'Student',
            'email'    => 'student@sis.com',
            'password' => bcrypt('password'),
            'role'     => 'student',
        ]);
    }
}