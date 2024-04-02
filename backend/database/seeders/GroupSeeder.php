<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = [
            [
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => 'Administrator',
            ],
            [
                'name' => 'User',
                'slug' => 'user',
                'description' => 'User',
            ],
        ];

        foreach ($groups as $group) {
            \App\Models\Group::create($group);
        }
    }
}
