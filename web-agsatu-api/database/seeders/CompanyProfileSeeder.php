<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class CompanyProfileSeeder extends Seeder
{
    public function run(): void
    {
        Service::insert([
            [
                'title' => 'Pengembangan Web',
                'slug' => 'pengembangan-web',
                'description' => 'Aplikasi web modern dan responsif dibangun dengan Laravel. Dari halaman akses hingga platform SaaS yang kompleks.',
                'icon' => 'web',
                'tags' => json_encode(['Laravel', 'PHP', 'MySQL']),
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Aplikasi Mobile',
                'slug' => 'aplikasi-mobile',
                'description' => 'Aplikasi mobile lintas platform dengan Flutter yang memberikan kinerja seperti native di iOS dan Android.',
                'icon' => 'mobile',
                'tags' => json_encode(['Flutter', 'iOS', 'Android']),
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Backend & API',
                'slug' => 'backend-api',
                'description' => 'Arsitektur server yang terukur, API RESTful, dan desain database yang mendukung aplikasi Anda.',
                'icon' => 'backend',
                'tags' => json_encode(['Laravel', 'PostgreSQL', 'REST API']),
                'order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        Portfolio::insert([
            [
                'title' => 'Sistem Informasi Akademik',
                'slug' => 'sistem-informasi-akademik',
                'description' => 'Aplikasi manajemen akademik untuk lembaga pendidikan.',
                'category' => 'EdTech',
                'tech' => json_encode(['Laravel', 'MySQL', 'Bootstrap']),
                'client_name' => 'SMK Contoh Kediri',
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Aplikasi Kasir Toko',
                'slug' => 'aplikasi-kasir-toko',
                'description' => 'Point of Sale untuk toko retail skala kecil-menengah.',
                'category' => 'E-Commerce',
                'tech' => json_encode(['React', 'Laravel', 'MySQL']),
                'client_name' => 'Toko Contoh Jaya',
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        Testimonial::insert([
            [
                'client_name' => 'Budi Santoso',
                'company' => 'PT Contoh Sejahtera',
                'message' => 'Tim Agsatu sangat responsif dan hasil kerjanya rapi sesuai kebutuhan kami.',
                'rating' => 5,
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
