<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->user?->name,
            'email' => $this->user?->email,
            'company_name' => $this->company_name,
            'phone' => $this->phone,
            'address' => $this->address,
            'projects_count' => $this->whenCounted('projects'),
        ];
    }
}
