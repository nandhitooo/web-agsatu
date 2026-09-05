<?php

namespace Database\Seeders;

use App\Models\ContactInfo;
use Illuminate\Database\Seeder;

class ContactInfoSeeder extends Seeder
{
    public function run(): void
    {
        ContactInfo::firstOrCreate(
            ['id' => 1],
            [
                'email' => 'hello@agsatu.id',
                'phone' => '+62 21 5555 0123',
                'office_address' => 'Kota Kediri, Indonesia',
            ],
        );
    }
}
