<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'client_name' => $this->client_name,
            'company' => $this->company,
            'message' => $this->message,
            'rating' => $this->rating,
            'photo_url' => $this->photo ? url(Storage::url($this->photo)) : null,
            'is_published' => $this->is_published,
        ];
    }
}
