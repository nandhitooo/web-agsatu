<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PortfolioResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'thumbnail_url' => $this->thumbnail ? url(Storage::url($this->thumbnail)) : null,
            'category' => $this->category,
            'tech' => $this->tech ?? [],
            'client_name' => $this->client_name,
            'is_published' => $this->is_published,
            'images' => $this->whenLoaded('images', function () {
                return $this->images->map(fn ($image) => [
                    'id' => $image->id,
                    'url' => url(Storage::url($image->image_path)),
                    'order' => $image->order,
                ]);
            }),
        ];
    }
}
