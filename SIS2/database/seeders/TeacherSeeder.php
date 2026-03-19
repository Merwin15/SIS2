<?php

namespace Database\Seeders;

use App\Models\Teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        $teachers = [
            [
                'name'        => 'Dr. Jose Santos',
                'email'       => 'jose.santos@sis.com',
                'employee_id' => 'EMP001',
                'department'  => 'Information Technology',
                'phone'       => '09171234567',
                'status'      => 'active',
            ],
            [
                'name'        => 'Prof. Maria Reyes',
                'email'       => 'maria.reyes@sis.com',
                'employee_id' => 'EMP002',
                'department'  => 'Information Technology',
                'phone'       => '09182345678',
                'status'      => 'active',
            ],
            [
                'name'        => 'Dr. Roberto Cruz',
                'email'       => 'roberto.cruz@sis.com',
                'employee_id' => 'EMP003',
                'department'  => 'Computer Science',
                'phone'       => '09193456789',
                'status'      => 'active',
            ],
            [
                'name'        => 'Prof. Ana Gonzales',
                'email'       => 'ana.gonzales@sis.com',
                'employee_id' => 'EMP004',
                'department'  => 'Information Technology',
                'phone'       => '09204567890',
                'status'      => 'active',
            ],
            [
                'name'        => 'Dr. Michael Dela Cruz',
                'email'       => 'michael.delacruz@sis.com',
                'employee_id' => 'EMP005',
                'department'  => 'Computer Science',
                'phone'       => '09215678901',
                'status'      => 'active',
            ],
            [
                'name'        => 'Prof. Liza Ramos',
                'email'       => 'liza.ramos@sis.com',
                'employee_id' => 'EMP006',
                'department'  => 'Information Technology',
                'phone'       => '09226789012',
                'status'      => 'active',
            ],
            [
                'name'        => 'Dr. Ramon Villanueva',
                'email'       => 'ramon.villanueva@sis.com',
                'employee_id' => 'EMP007',
                'department'  => 'Computer Science',
                'phone'       => '09237890123',
                'status'      => 'active',
            ],
            [
                'name'        => 'Prof. Christine Bautista',
                'email'       => 'christine.bautista@sis.com',
                'employee_id' => 'EMP008',
                'department'  => 'Information Technology',
                'phone'       => '09248901234',
                'status'      => 'inactive',
            ],
        ];

        foreach ($teachers as $teacher) {
            Teacher::firstOrCreate(
                ['email' => $teacher['email']],
                $teacher
            );
        }

        $this->command->info('Teachers seeded successfully! Total: ' . count($teachers) . ' teachers.');
    }
}