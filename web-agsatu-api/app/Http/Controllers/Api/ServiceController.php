<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    /**
     * GET /api/services
     * Publik: hanya tampilkan yang aktif, terurut sesuai kolom "order".
     */
    public function index(): JsonResponse
    {
        $services = Service::where('is_active', true)
            ->orderBy('order')
            ->get();

        return ServiceResource::collection($services)->response();
    }

    /**
     * GET /api/admin/services
     * Admin: lihat SEMUA data (aktif maupun non-aktif).
     */
    public function adminIndex(): JsonResponse
    {
        $services = Service::orderBy('order')->get();

        return ServiceResource::collection($services)->response();
    }

    /**
     * GET /api/services/{service} (admin, termasuk yang non-aktif)
     */
    public function show(Service $service): JsonResponse
    {
        return (new ServiceResource($service))->response();
    }

    /**
     * POST /api/admin/services
     */
    public function store(StoreServiceRequest $request): JsonResponse
    {
        $service = Service::create($request->validated());

        return (new ServiceResource($service))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * PUT /api/admin/services/{service}
     */
    public function update(StoreServiceRequest $request, Service $service): JsonResponse
    {
        $service->update($request->validated());

        return (new ServiceResource($service))->response();
    }

    /**
     * DELETE /api/admin/services/{service}
     */
    public function destroy(Service $service): JsonResponse
    {
        $service->delete();

        return response()->json(['message' => 'Layanan berhasil dihapus.']);
    }
}
