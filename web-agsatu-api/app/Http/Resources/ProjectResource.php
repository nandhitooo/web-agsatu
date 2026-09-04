<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'start_date' => $this->start_date?->format('Y-m-d'),
            'deadline' => $this->deadline?->format('Y-m-d'),
            'client' => [
                'id' => $this->client?->id,
                'name' => $this->client?->user?->name,
                'company_name' => $this->client?->company_name,
            ],
            'milestones' => $this->whenLoaded('milestones', function () {
                return $this->milestones->map(fn ($m) => [
                    'id' => $m->id,
                    'title' => $m->title,
                    'description' => $m->description,
                    'status' => $m->status,
                    'due_date' => $m->due_date?->format('Y-m-d'),
                    'completed_at' => $m->completed_at?->format('Y-m-d H:i'),
                    'order' => $m->order,
                ]);
            }),
            'documents' => $this->whenLoaded('documents', function () {
                return $this->documents->map(fn ($d) => [
                    'id' => $d->id,
                    'file_name' => $d->file_name,
                    'type' => $d->type,
                    'url' => url(Storage::url($d->file_path)),
                    'uploaded_by' => $d->uploader?->name,
                    'created_at' => $d->created_at?->format('Y-m-d H:i'),
                ]);
            }),
        ];
    }
}
