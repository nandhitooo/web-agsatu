# Panduan Integrasi Modul Company Profile

File-file ini siap dicopy ke project `web-agsatu-api` kalian, ikuti struktur folder yang sama persis (`app/Models`, `app/Http/Controllers/Api`, dst).

## 1. Install Sanctum (kalau belum)

```bash
composer require laravel/sanctum
php artisan install:api
```

Perintah `install:api` otomatis bikin `routes/api.php` dan mendaftarkan middleware `auth:sanctum`. Kalau file `routes/api.php` sudah ke-generate duluan, tinggal timpa isinya dengan file `routes/api.php` yang sudah dibuatkan di sini.

## 2. Daftarkan middleware `role`

Buka `bootstrap/app.php`, cari bagian `->withMiddleware(function (Middleware $middleware) {` lalu tambahkan alias:

```php
use App\Http\Middleware\CheckRole;

->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'role' => CheckRole::class,
    ]);
})
```

## 3. Copy semua file ke lokasi yang sesuai

- `database/migrations/*.php` → `database/migrations/`
- `database/seeders/CompanyProfileSeeder.php` → `database/seeders/`
- `app/Models/*.php` → `app/Models/`
- `app/Http/Controllers/Api/*.php` → `app/Http/Controllers/Api/`
- `app/Http/Requests/*.php` → `app/Http/Requests/`
- `app/Http/Resources/*.php` → `app/Http/Resources/`
- `app/Http/Middleware/CheckRole.php` → `app/Http/Middleware/`
- `routes/api.php` → timpa yang sudah ada

## 4. Daftarkan seeder di `DatabaseSeeder.php`

```php
public function run(): void
{
    $this->call([
        CompanyProfileSeeder::class,
    ]);
}
```

## 5. Jalankan migration & seeder

```bash
php artisan migrate
php artisan db:seed
```

## 6. Setup storage link (buat upload gambar portfolio/testimonial)

```bash
php artisan storage:link
```

## 7. Bikin user admin manual buat testing

Paling gampang lewat tinker:

```bash
php artisan tinker
```

```php
App\Models\User::create([
    'name' => 'Admin Agsatu',
    'email' => 'admin@agsatu.test',
    'password' => bcrypt('password'),
    'role' => 'admin',
]);
```

## 8. Test endpoint

- `GET http://localhost:8000/api/services` → harus muncul 3 data dummy
- `GET http://localhost:8000/api/portfolios` → harus muncul 2 data dummy
- `GET http://localhost:8000/api/testimonials` → harus muncul 1 data dummy
- `POST http://localhost:8000/api/inquiries` dengan body `{name, email, phone, message}` → harus tersimpan

Untuk endpoint `/api/admin/*`, perlu login dulu lewat Sanctum (butuh endpoint login — ini bagian dari setup Auth yang belum dibuat di modul ini, bisa jadi langkah lanjutan).

## Catatan penting

- Route `POST /api/admin/portfolios/{portfolio}` (bukan PUT) sengaja dipakai untuk update karena HTML form/FormData tidak mendukung method PUT langsung kalau ada file upload. Dari React, kirim dengan `FormData` + tambahkan field `_method: 'PUT'`, Laravel akan otomatis mengenalinya sebagai method spoofing.
- Kolom `converted_to_project_id` di tabel `inquiries` sengaja tanpa foreign key dulu karena tabel `projects` ada di modul Portal Klien yang belum dibuat. Nanti kalau modul itu jadi, bisa ditambahkan foreign key lewat migration baru.
