<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactInfoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'email' => $this->email,
            'phone' => $this->phone,
            'office_address' => $this->office_address,
            'whatsapp_url' => $this->whatsapp_url,
            'instagram_url' => $this->instagram_url,
            'linkedin_url' => $this->linkedin_url,
        ];
    }
}
