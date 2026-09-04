<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ClientPortalSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'klien@contoh.test'],
            [
                'name' => 'Budi Santoso',
                'password' => Hash::make('password'),
                'role' => 'client',
            ],
        );

        $client = Client::firstOrCreate(
            ['user_id' => $user->id],
            [
                'company_name' => 'PT Contoh Sejahtera',
                'phone' => '081234567890',
                'address' => 'Jl. Contoh No. 1, Kediri',
            ],
        );

        $project = Project::create([
            'client_id' => $client->id,
            'name' => 'Website Company Profile',
            'description' => 'Pembuatan website company profile dengan CMS terintegrasi.',
            'status' => 'development',
            'start_date' => now()->subWeeks(3),
            'deadline' => now()->addWeeks(5),
        ]);

        $project->milestones()->createMany([
            [
                'title' => 'Analisis Kebutuhan & Wireframe',
                'status' => 'done',
                'completed_at' => now()->subWeeks(2),
                'order' => 1,
            ],
            [
                'title' => 'Development Frontend',
                'status' => 'in_progress',
                'due_date' => now()->addWeek(),
                'order' => 2,
            ],
            [
                'title' => 'Development Backend & API',
                'status' => 'pending',
                'due_date' => now()->addWeeks(3),
                'order' => 3,
            ],
            [
                'title' => 'Testing & Serah Terima',
                'status' => 'pending',
                'due_date' => now()->addWeeks(5),
                'order' => 4,
            ],
        ]);
    }
}
