<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactInfo extends Model
{
    protected $table = 'contact_info';

    protected $fillable = [
        'email',
        'phone',
        'office_address',
        'whatsapp_url',
        'instagram_url',
        'linkedin_url',
    ];
}
