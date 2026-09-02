<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'thumbnail',
        'category',
        'tech',
        'client_name',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'tech' => 'array',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(PortfolioImage::class)->orderBy('order');
    }
}
