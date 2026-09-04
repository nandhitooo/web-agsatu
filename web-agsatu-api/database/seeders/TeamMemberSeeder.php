<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        TeamMember::insert([
            [
                'name' => 'Andi Pratama',
                'role' => 'CEO & Pendiri',
                'bio' => 'Pemimpin visioner dengan pengalaman 10+ tahun di rekayasa perangkat lunak dan strategi bisnis.',
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sari Dewi',
                'role' => 'Desainer Utama',
                'bio' => 'Desainer UI/UX berpenghargaan yang bersemangat menciptakan pengalaman intuitif.',
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Budi Santoso',
                'role' => 'Tech Lead',
                'bio' => 'Arsitek full-stack yang mengkhususkan diri dalam sistem terdistribusi yang terukur.',
                'order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
