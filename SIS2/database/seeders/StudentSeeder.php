<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $students = [
            [
                'name'     => 'Juan Dela Cruz',
                'email'    => 'juan.delacruz@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Maria Santos',
                'email'    => 'maria.santos@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Pedro Reyes',
                'email'    => 'pedro.reyes@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Ana Garcia',
                'email'    => 'ana.garcia@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Carlo Mendoza',
                'email'    => 'carlo.mendoza@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Rosa Flores',
                'email'    => 'rosa.flores@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Mark Torres',
                'email'    => 'mark.torres@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Jenny Aquino',
                'email'    => 'jenny.aquino@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Luis Pascual',
                'email'    => 'luis.pascual@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Claire Navarro',
                'email'    => 'claire.navarro@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Ryan Castillo',
                'email'    => 'ryan.castillo@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Patricia Lim',
                'email'    => 'patricia.lim@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Kevin Ong',
                'email'    => 'kevin.ong@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Sophia Tan',
                'email'    => 'sophia.tan@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
            [
                'name'     => 'Daniel Hernandez',
                'email'    => 'daniel.hernandez@student.sis.com',
                'password' => Hash::make('password'),
                'role'     => 'student',
            ],
        ];

        foreach ($students as $student) {
            User::firstOrCreate(
                ['email' => $student['email']],
                $student
            );
        }

        $this->command->info('Students seeded successfully! Total: ' . count($students) . ' students.');
    }
}