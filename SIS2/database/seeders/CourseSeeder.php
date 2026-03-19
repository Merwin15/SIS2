<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $courses = [
            // First Year
            ['name' => 'Introduction to Computing', 'code' => 'IT101', 'units' => 3, 'description' => 'Fundamentals of computing and computer systems.'],
            ['name' => 'Computer Programming 1', 'code' => 'IT102', 'units' => 3, 'description' => 'Introduction to programming using structured approach.'],
            ['name' => 'Mathematics in the Modern World', 'code' => 'IT103', 'units' => 3, 'description' => 'Mathematical concepts and applications in modern world.'],
            ['name' => 'Computer Hardware Fundamentals', 'code' => 'IT104', 'units' => 3, 'description' => 'Basic hardware components and troubleshooting.'],
            ['name' => 'Web Development 1', 'code' => 'IT105', 'units' => 3, 'description' => 'Introduction to HTML, CSS, and basic web design.'],

            // Second Year
            ['name' => 'Computer Programming 2', 'code' => 'IT201', 'units' => 3, 'description' => 'Object-oriented programming concepts and applications.'],
            ['name' => 'Data Structures and Algorithms', 'code' => 'IT202', 'units' => 3, 'description' => 'Fundamental data structures and algorithm design.'],
            ['name' => 'Database Management Systems', 'code' => 'IT203', 'units' => 3, 'description' => 'Database design, SQL, and database administration.'],
            ['name' => 'Discrete Mathematics', 'code' => 'IT204', 'units' => 3, 'description' => 'Logic, sets, relations, and graph theory.'],
            ['name' => 'Web Development 2', 'code' => 'IT205', 'units' => 3, 'description' => 'Advanced web development using JavaScript and frameworks.'],
            ['name' => 'Computer Networks', 'code' => 'IT206', 'units' => 3, 'description' => 'Network fundamentals, protocols, and architecture.'],

            // Third Year
            ['name' => 'Systems Analysis and Design', 'code' => 'IT301', 'units' => 3, 'description' => 'System development methodologies and design techniques.'],
            ['name' => 'Operating Systems', 'code' => 'IT302', 'units' => 3, 'description' => 'OS concepts, process management, and memory management.'],
            ['name' => 'Software Engineering', 'code' => 'IT303', 'units' => 3, 'description' => 'Software development life cycle and engineering principles.'],
            ['name' => 'Human Computer Interaction', 'code' => 'IT304', 'units' => 3, 'description' => 'UI/UX design principles and usability engineering.'],
            ['name' => 'Information Assurance and Security', 'code' => 'IT305', 'units' => 3, 'description' => 'Cybersecurity principles and information protection.'],
            ['name' => 'Mobile Application Development', 'code' => 'IT306', 'units' => 3, 'description' => 'Developing mobile applications for Android and iOS.'],

            // Fourth Year
            ['name' => 'Capstone Project 1', 'code' => 'IT401', 'units' => 3, 'description' => 'Research and planning phase of the capstone project.'],
            ['name' => 'Capstone Project 2', 'code' => 'IT402', 'units' => 3, 'description' => 'Development and implementation of the capstone project.'],
            ['name' => 'IT Project Management', 'code' => 'IT403', 'units' => 3, 'description' => 'Project planning, execution, and management techniques.'],
            ['name' => 'Technopreneurship', 'code' => 'IT404', 'units' => 3, 'description' => 'Technology entrepreneurship and business innovation.'],
            ['name' => 'Practicum / OJT', 'code' => 'IT405', 'units' => 6, 'description' => 'On-the-job training in IT-related industries.'],
        ];

        foreach ($courses as $course) {
            Course::firstOrCreate(
                ['code' => $course['code']],
                [
                    'name'        => $course['name'],
                    'units'       => $course['units'],
                    'description' => $course['description'],
                    'status'      => 'active',
                    'teacher_id'  => null,
                ]
            );
        }

        $this->command->info('IT Courses seeded successfully! Total: ' . count($courses) . ' courses.');
    }
}