<?php

namespace Database\Seeders;

use App\Models\AboutContent;
use Illuminate\Database\Seeder;

class AboutContentSeeder extends Seeder
{
    public function run(): void
    {
        AboutContent::firstOrCreate(
            ['id' => 1],
            [
                'headline' => 'Menciptakan Perangkat Lunak dengan Kebanggaan & Ketelitian',
                'description_1' => 'Didirikan pada tahun 2019, AGSatu dimulai dengan misi sederhana: membantu bisnis berkembang di dunia digital. Hari ini, kami adalah tim pengembang, desainer, dan strategis yang bersemangat mengubah ide menjadi produk digital yang kuat.',
                'description_2' => 'Kami percaya pada komunikasi yang transparan, metodologi agile, dan memberikan nilai nyata. Setiap proyek yang kami tangani adalah kemitraan — kesuksesan Anda adalah kesuksesan kami.',
                'highlight_title' => 'Inovasi Utama',
                'highlight_description' => 'Kami memanfaatkan teknologi terkini untuk membangun solusi yang terbukti, siap masa depan.',
                // Cukup kirim array PHP biasa di sini. Model sudah punya
                // cast 'array' untuk kolom ini, jadi Eloquent otomatis
                // meng-encode ke JSON sendiri. Kalau di-json_encode() manual
                // di sini, hasilnya ke-encode DUA KALI dan rusak saat dibaca.
                'tech_badges' => ['Laravel', 'PHP', 'Flutter'],
                'features' => [
                    ['title' => 'Proses Agile', 'description' => 'Pengembangan iteratif dengan pemeriksaan rutin'],
                    ['title' => 'Kode Berkualitas', 'description' => 'Kode bersih, mudah dipelihara, dan teruji'],
                    ['title' => 'Tepat Waktu', 'description' => 'Kami menghargai tenggat waktu dan berkomunikasi proaktif'],
                    ['title' => 'Dukungan Jangka Panjang', 'description' => 'Pemeliharaan berkelanjutan dan dukungan khusus'],
                ],
            ],
        );
    }
}