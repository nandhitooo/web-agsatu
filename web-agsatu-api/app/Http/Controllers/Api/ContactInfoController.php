<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateContactInfoRequest;
use App\Http\Resources\ContactInfoResource;
use App\Models\ContactInfo;
use Illuminate\Http\JsonResponse;

class ContactInfoController extends Controller
{
    /**
     * GET /api/contact-info
     * Publik: ambil satu-satunya baris info kontak.
     */
    public function index(): JsonResponse
    {
        $contact = ContactInfo::first();

        if (! $contact) {
            return response()->json([
                'data' => [
                    'email' => null,
                    'phone' => null,
                    'office_address' => null,
                    'whatsapp_url' => null,
                    'instagram_url' => null,
                    'linkedin_url' => null,
                ],
            ]);
        }

        return (new ContactInfoResource($contact))->response();
    }

    /**
     * PUT /api/admin/contact-info
     * Admin: update satu-satunya baris. Kalau belum ada, otomatis dibuat.
     */
    public function update(UpdateContactInfoRequest $request): JsonResponse
    {
        $contact = ContactInfo::first();

        if ($contact) {
            $contact->update($request->validated());
        } else {
            $contact = ContactInfo::create($request->validated());
        }

        return (new ContactInfoResource($contact))->response();
    }
}
