<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::firstOrCreate(
            ['email' => 'admin@sis.com'],
            [
                'name'     => 'Admin',
                'password' => bcrypt('password'),
                'role'     => 'admin',
            ]
        );

        $this->call([
            TeacherSeeder::class,
            CourseSeeder::class,
            StudentSeeder::class,
        ]);
    }
}