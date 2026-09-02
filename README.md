# Web Agsatu — Sistem Web Company Profile dengan CMS & Client Portal

> **Proyek Kerja Praktik (KP) — 2 Orang Mahasiswa**
>
> Sistem informasi berbawa web untuk perusahaan yang menghadirkan halaman company profile publik yang terintegrasi penuh dengan modul **Content Management System (CMS)** untuk pengelolaan konten serta **Client Portal** untuk manajemen relasi pelanggan.

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Arsitektur Sistem](#arsitektur-sistem)
- [Struktur Folder](#struktur-folder)
- [Instalasi & Setup](#instalasi--setup)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [API Endpoints](#api-endpoints)
- [Model & Database](#model--database)
- [Tim Pengembang](#tim-pengembang)

---

## Tentang Proyek

Web Agsatu adalah platform web perusahaan yang dibangun untuk memenuhi kebutuhan digital sebuah perusahaan dalam menampilkan profil layanan, portofolio, serta mempermudah interaksi dengan klien. Proyek ini dikembangkan sebagai bagian dari program **Kerja Praktik (KP)** oleh **2 orang mahasiswa**.

Sistem ini terdiri dari dua sisi:

| Sisi                           | Deskripsi                                                                                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Landing Page (Publik)**      | Halaman company profile yang dapat diakses siapa saja. Menampilkan hero, tentang kami, layanan, tim, portofolio, testimoni, dan formulir kontak/inquiry. |
| **CMS Admin (Terautektikasi)** | Dashboard admin untuk mengelola semua konten yang ditampilkan di landing page (services, portfolios, testimonials) serta mengelola inquiry dari klien.   |

---

## Fitur Utama

### Landing Page (Publik)

- 🏠 **Hero Section** — Sambutan utama dengan call-to-action
- ℹ️ **About** — Profil perusahaan, visi & misi
- 🛠️ **Services** — Daftar layanan perusahaan (data dinamis dari API)
- 👥 **Team** — Profil tim/anggota perusahaan
- 💼 **Portfolio** — Galeri proyek yang telah dikerjakan
- 💬 **Testimonials** — Testimoni klien
- 📩 **Contact & Inquiry** — Formulir kontak untuk calon klien
- 🎨 **Desain Responsif** — Mobile-first dengan Tailwind CSS
- ✨ **Animasi Scroll** — Efek reveal saat scroll (IntersectionObserver)

### CMS Admin (Terautektikasi)

- 🔐 **Autentikasi** — Login/logout berbasis token (Laravel Sanctum)
- 🛡️ **Role-based Access** — Pemisahan akses `admin` dan `client`
- 📋 **Manajemen Services** — CRUD layanan perusahaan
- 📸 **Manajemen Portfolio** — CRUD portofolio + upload gambar (thumbnail & galeri)
- ⭐ **Manajemen Testimonials** — CRUD testimoni klien + upload foto
- 📨 **Manajemen Inquiries** — Lihat, filter status, dan hapus inquiry dari klien
- 📊 **Status Tracking** — Inquiry dilacak statusnya (`new` → `in_progress` → `done`)

---

## Tech Stack

### Backend

| Teknologi           | Versi  | Fungsi                                            |
| ------------------- | ------ | ------------------------------------------------- |
| **PHP**             | ^8.3   | Bahasa pemrograman server                         |
| **Laravel**         | ^13.17 | Framework PHP utama                               |
| **Laravel Sanctum** | ^4.3   | Autentikasi API token                             |
| **SQLite**          | —      | Database (default, bisa diganti MySQL/PostgreSQL) |
| **PHPUnit**         | ^12.5  | Testing                                           |

### Frontend

| Teknologi        | Versi   | Fungsi                      |
| ---------------- | ------- | --------------------------- |
| **React**        | ^19.2.8 | UI library                  |
| **Vite**         | ^8.2.2  | Build tool & dev server     |
| **Tailwind CSS** | ^4.3.3  | Utility-first CSS framework |
| **Axios**        | ^1.20.0 | HTTP client                 |
| **Oxlint**       | ^1.80.0 | JavaScript linter           |

---

## Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                      Web Agsatu                              │
├─────────────────────────┬───────────────────────────────────┤
│      Frontend (React)   │        Backend (Laravel)          │
│                         │                                   │
│  ┌───────────────────┐  │  ┌─────────────────────────────┐  │
│  │   Landing Page    │  │  │        API Routes           │  │
│  │  (Publik)         │──┼──┤  /api/services               │  │
│  │                   │  │  │  /api/portfolios             │  │
│  │  - Hero           │  │  │  /api/testimonials           │  │
│  │  - About          │  │  │  /api/inquiries              │  │
│  │  - Services       │  │  │  /api/login                  │  │
│  │  - Team           │  │  │  /api/admin/*                │  │
│  │  - Portfolio      │  │  └─────────────────────────────┘  │
│  │  - Testimonials   │  │              │                    │
│  │  - Contact        │  │              ▼                    │
│  │  - Footer         │  │  ┌─────────────────────────────┐  │
│  └───────────────────┘  │  │       Controllers           │  │
│                         │  │                             │  │
│  ┌───────────────────┐  │  │  - AuthController           │  │
│  │   Admin Panel     │  │  │  - ServiceController        │  │
│  │  (CMS - future)   │──┼──┤  - PortfolioController      │  │
│  │                   │  │  │  - TestimonialController    │  │
│  └───────────────────┘  │  │  - InquiryController        │  │
│                         │  └─────────────────────────────┘  │
│                         │              │                    │
│                         │              ▼                    │
│                         │  ┌─────────────────────────────┐  │
│                         │  │    Models + Resources       │  │
│                         │  │                             │  │
│                         │  │  - User (Sanctum tokens)    │  │
│                         │  │  - Service                  │  │
│                         │  │  - Portfolio (+ Image)      │  │
│                         │  │  - Testimonial              │  │
│                         │  │  - Inquiry                  │  │
│                         │  └─────────────────────────────┘  │
│                         │              │                    │
│                         │              ▼                    │
│                         │  ┌─────────────────────────────┐  │
│                         │  │        SQLite DB            │  │
│                         │  └─────────────────────────────┘  │
└─────────────────────────┴───────────────────────────────────┘
```

---

## Struktur Folder

```
web-agsatu/
├── web-agsatu-api/                 # Backend — Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/
│   │   │   │   ├── Auth/
│   │   │   │   │   └── AuthController.php
│   │   │   │   ├── ServiceController.php
│   │   │   │   ├── PortfolioController.php
│   │   │   │   ├── TestimonialController.php
│   │   │   │   └── InquiryController.php
│   │   │   ├── Requests/            # Form request validation
│   │   │   └── Resources/           # API Resources (transformasi)
│   │   └── Models/
│   │       ├── User.php
│   │       ├── Service.php
│   │       ├── Portfolio.php
│   │       ├── PortfolioImage.php
│   │       ├── Testimonial.php
│   │       └── Inquiry.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   │       └── CompanyProfileSeeder.php
│   ├── routes/
│   │   └── api.php
│   └── composer.json
│
└── web-agsatu-client/              # Frontend — React
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Hero.jsx
    │   │   ├── About.jsx
    │   │   ├── Services.jsx
    │   │   ├── Team.jsx
    │   │   ├── Portfolio.jsx
    │   │   ├── Contact.jsx
    │   │   └── Footer.jsx
    │   ├── services/
    │   │   └── api.js              # Konfigurasi Axios
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## Instalasi & Setup

### Prasyarat

- PHP >= 8.3
- Composer
- Node.js >= 18
- npm

### 1. Clone Repository

```bash
git clone <repository-url>
cd web-agsatu
```

### 2. Setup Backend (Laravel)

```bash
cd web-agsatu-api

# Install dependencies
composer install

# Copy file environment
cp .env.example .env

# Generate application key
php artisan key:generate

# Pastikan database SQLite sudah ada
touch database/database.sqlite

# Jalankan migration & seeder
php artisan migrate --seed --class=CompanyProfileSeeder

# Buat symbolic link untuk storage
php artisan storage:link
```

### 3. Setup Frontend (React)

```bash
cd web-agsatu-client

# Install dependencies
npm install

# Copy file environment
cp .env.example .env.local
```

Sesuaikan `VITE_API_URL` di `.env.local` dengan URL backend Laravel Anda:

```
VITE_API_URL=http://localhost:8000
```

---

## Menjalankan Aplikasi

### Jalankan Backend

```bash
cd web-agsatu-api
php artisan serve
```

Backend berjalan di: `http://localhost:8000`

### Jalankan Frontend

```bash
cd web-agsatu-client
npm run dev
```

Frontend berjalan di: `http://localhost:5173`

---

## API Endpoints

### Publik (Tanpa Auth)

| Method | Endpoint                      | Deskripsi                      |
| ------ | ----------------------------- | ------------------------------ |
| `GET`  | `/api/services`               | Daftar layanan aktif           |
| `GET`  | `/api/portfolios`             | Daftar portofolio terpublikasi |
| `GET`  | `/api/portfolios/{portfolio}` | Detail portofolio              |
| `GET`  | `/api/testimonials`           | Daftar testimoni terpublikasi  |
| `POST` | `/api/inquiries`              | Kirim inquiry dari form kontak |

### Auth

| Method | Endpoint      | Deskripsi                     |
| ------ | ------------- | ----------------------------- |
| `POST` | `/api/login`  | Login (email & password)      |
| `POST` | `/api/logout` | Logout (hapus token saat ini) |
| `GET`  | `/api/me`     | Info user yang sedang login   |

### Admin (Butuh Auth + Role Admin)

| Method   | Endpoint                        | Deskripsi                               |
| -------- | ------------------------------- | --------------------------------------- |
| `GET`    | `/api/services/{service}`       | Detail layanan (termasuk non-aktif)     |
| `POST`   | `/api/admin/services`           | Buat layanan baru                       |
| `PUT`    | `/api/admin/services/{service}` | Update layanan                          |
| `DELETE` | `/api/admin/services/{service}` | Hapus layanan                           |
| `POST`   | `/api/admin/portfolios`         | Buat portofolio (+ upload gambar)       |
| `POST`   | `/api/admin/portfolios/{id}`    | Update portofolio (+ upload gambar)     |
| `DELETE` | `/api/admin/portfolios/{id}`    | Hapus portofolio                        |
| `POST`   | `/api/admin/testimonials`       | Buat testimoni (+ upload foto)          |
| `POST`   | `/api/admin/testimonials/{id}`  | Update testimoni                        |
| `DELETE` | `/api/admin/testimonials/{id}`  | Hapus testimoni                         |
| `GET`    | `/api/admin/inquiries`          | Daftar semua inquiry (filter by status) |
| `PUT`    | `/api/admin/inquiries/{id}`     | Update status inquiry                   |
| `DELETE` | `/api/admin/inquiries/{id}`     | Hapus inquiry                           |

---

## Model & Database

### Users

| Kolom            | Tipe   | Keterangan         |
| ---------------- | ------ | ------------------ |
| `id`             | bigint | Primary key        |
| `name`           | string | Nama user          |
| `email`          | string | Email (unique)     |
| `password`       | string | Password (hashed)  |
| `role`           | enum   | `admin` / `client` |
| `remember_token` | string | Token remember me  |

### Services

| Kolom         | Tipe            | Keterangan              |
| ------------- | --------------- | ----------------------- |
| `title`       | string          | Nama layanan            |
| `slug`        | string          | URL-friendly identifier |
| `description` | text            | Deskripsi layanan       |
| `icon`        | string          | Icon identifier         |
| `tags`        | JSON            | Array teknologi/tag     |
| `order` int   | Urutan tampilan |
| `is_active`   | boolean         | Status aktif/tidak      |

### Portfolios

| Kolom          | Tipe    | Keterangan                     |
| -------------- | ------- | ------------------------------ |
| `title`        | string  | Judul proyek                   |
| `slug`         | string  | URL-friendly identifier        |
| `description`  | text    | Deskripsi proyek               |
| `thumbnail`    | string  | Path gambar thumbnail          |
| `category`     | string  | Kategori proyek                |
| `tech`         | JSON    | Array teknologi yang digunakan |
| `client_name`  | string  | Nama klien                     |
| `is_published` | boolean | Status publikasi               |

### PortfolioImages (Relasi 1:N dengan Portfolios)

| Kolom          | Tipe   | Keterangan    |
| -------------- | ------ | ------------- |
| `portfolio_id` | bigint | Foreign key   |
| `image_path`   | string | Path gambar   |
| `order`        | int    | Urutan gambar |

### Testimonials

| Kolom          | Tipe    | Keterangan            |
| -------------- | ------- | --------------------- |
| `client_name`  | string  | Nama klien            |
| `company`      | string  | Nama perusahaan klien |
| `message`      | text    | Isi testimoni         |
| `rating`       | int     | Rating (1-5)          |
| `photo`        | string  | Path foto klien       |
| `is_published` | boolean | Status publikasi      |

### Inquiries

| Kolom                     | Tipe   | Keterangan                     |
| ------------------------- | ------ | ------------------------------ |
| `name`                    | string | Nama pengirim                  |
| `email`                   | string | Email pengirim                 |
| `phone`                   | string | Nomor telepon                  |
| `company`                 | string | Perusahaan pengirim            |
| `message`                 | text   | Isi pesan/inquiry              |
| `status`                  | enum   | `new` / `in_progress` / `done` |
| `converted_to_project_id` | bigint | FK ke proyek (jika dikonversi) |

---

## Tim Pengembang

Proyek Kerja Praktik ini dikembangkan oleh:

1. **[Fernandhito Dian Pratama]** — [@nandhitooo](https://github.com/nandhitooo)
2. **[Mohammad Daffa Teuku Filan Alfarizhi]** — [@github-mdafftfa](https://github.com/mdafftfa)

---

## Lisensi

Proyek ini dikembangkan untuk keperluan akademik (Kerja Praktik) dan tidak memiliki lisensi komersial.

---
