<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePortfolioRequest;
use App\Http\Resources\PortfolioResource;
use App\Models\Portfolio;
use App\Models\PortfolioImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    /**
     * GET /api/portfolios
     * Publik: hanya yang is_published = true.
     */
    public function index(): JsonResponse
    {
        $portfolios = Portfolio::with('images')
            ->where('is_published', true)
            ->latest()
            ->get();

        return PortfolioResource::collection($portfolios)->response();
    }

    /**
     * GET /api/portfolios/{portfolio}
     */
    public function show(Portfolio $portfolio): JsonResponse
    {
        $portfolio->load('images');

        return (new PortfolioResource($portfolio))->response();
    }

    /**
     * POST /api/admin/portfolios
     * Menerima multipart/form-data karena ada upload thumbnail + images[].
     */
    public function store(StorePortfolioRequest $request): JsonResponse
    {
        $data = $request->safe()->except(['images', 'thumbnail']);

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('portfolios', 'public');
        }

        $portfolio = Portfolio::create($data);

        $this->storeAdditionalImages($request, $portfolio);

        return (new PortfolioResource($portfolio->load('images')))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * PUT /api/admin/portfolios/{portfolio}
     */
    public function update(StorePortfolioRequest $request, Portfolio $portfolio): JsonResponse
    {
        $data = $request->safe()->except(['images', 'thumbnail']);

        if ($request->hasFile('thumbnail')) {
            if ($portfolio->thumbnail) {
                Storage::disk('public')->delete($portfolio->thumbnail);
            }
            $data['thumbnail'] = $request->file('thumbnail')->store('portfolios', 'public');
        }

        $portfolio->update($data);

        $this->storeAdditionalImages($request, $portfolio);

        return (new PortfolioResource($portfolio->load('images')))->response();
    }

    /**
     * DELETE /api/admin/portfolios/{portfolio}
     */
    public function destroy(Portfolio $portfolio): JsonResponse
    {
        foreach ($portfolio->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }
        if ($portfolio->thumbnail) {
            Storage::disk('public')->delete($portfolio->thumbnail);
        }

        $portfolio->delete();

        return response()->json(['message' => 'Portofolio berhasil dihapus.']);
    }

    private function storeAdditionalImages(StorePortfolioRequest $request, Portfolio $portfolio): void
    {
        if (! $request->hasFile('images')) {
            return;
        }

        foreach ($request->file('images') as $index => $file) {
            $path = $file->store('portfolios/gallery', 'public');

            PortfolioImage::create([
                'portfolio_id' => $portfolio->id,
                'image_path' => $path,
                'order' => $index,
            ]);
        }
    }
}
