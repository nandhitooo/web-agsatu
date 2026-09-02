<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTestimonialRequest;
use App\Http\Resources\TestimonialResource;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    /**
     * GET /api/testimonials
     */
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::where('is_published', true)
            ->latest()
            ->get();

        return TestimonialResource::collection($testimonials)->response();
    }

    /**
     * POST /api/admin/testimonials
     */
    public function store(StoreTestimonialRequest $request): JsonResponse
    {
        $data = $request->safe()->except('photo');

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('testimonials', 'public');
        }

        $testimonial = Testimonial::create($data);

        return (new TestimonialResource($testimonial))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * PUT /api/admin/testimonials/{testimonial}
     */
    public function update(StoreTestimonialRequest $request, Testimonial $testimonial): JsonResponse
    {
        $data = $request->safe()->except('photo');

        if ($request->hasFile('photo')) {
            if ($testimonial->photo) {
                Storage::disk('public')->delete($testimonial->photo);
            }
            $data['photo'] = $request->file('photo')->store('testimonials', 'public');
        }

        $testimonial->update($data);

        return (new TestimonialResource($testimonial))->response();
    }

    /**
     * DELETE /api/admin/testimonials/{testimonial}
     */
    public function destroy(Testimonial $testimonial): JsonResponse
    {
        if ($testimonial->photo) {
            Storage::disk('public')->delete($testimonial->photo);
        }

        $testimonial->delete();

        return response()->json(['message' => 'Testimoni berhasil dihapus.']);
    }
}
