<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutContent extends Model
{
    protected $table = 'about_content';

    protected $fillable = [
        'headline',
        'description_1',
        'description_2',
        'highlight_title',
        'highlight_description',
        'tech_badges',
        'features',
    ];

    protected $casts = [
        'tech_badges' => 'array',
        'features' => 'array',
    ];
}
