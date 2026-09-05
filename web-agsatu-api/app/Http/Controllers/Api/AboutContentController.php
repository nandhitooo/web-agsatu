<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateAboutContentRequest;
use App\Http\Resources\AboutContentResource;
use App\Models\AboutContent;
use Illuminate\Http\JsonResponse;

class AboutContentController extends Controller
{
    /**
     * GET /api/about
     * Publik: ambil satu-satunya baris konten About.
     * Kalau belum pernah diisi sama sekali, kembalikan default kosong
     * daripada error, biar landing page tidak rusak.
     */
    public function index(): JsonResponse
    {
        $about = AboutContent::first();

        if (! $about) {
            return response()->json([
                'data' => [
                    'headline' => '',
                    'description_1' => '',
                    'description_2' => '',
                    'highlight_title' => '',
                    'highlight_description' => '',
                    'tech_badges' => [],
                    'features' => [],
                ],
            ]);
        }

        return (new AboutContentResource($about))->response();
    }

    /**
     * PUT /api/admin/about
     * Admin: update satu-satunya baris. Kalau belum ada, otomatis dibuat.
     */
    public function update(UpdateAboutContentRequest $request): JsonResponse
    {
        $about = AboutContent::first();

        if ($about) {
            $about->update($request->validated());
        } else {
            $about = AboutContent::create($request->validated());
        }

        return (new AboutContentResource($about))->response();
    }
}
