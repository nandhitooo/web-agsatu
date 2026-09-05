<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AboutContentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'headline' => $this->headline,
            'description_1' => $this->description_1,
            'description_2' => $this->description_2,
            'highlight_title' => $this->highlight_title,
            'highlight_description' => $this->highlight_description,
            'tech_badges' => $this->tech_badges ?? [],
            'features' => $this->features ?? [],
        ];
    }
}
