<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInquiryRequest;
use App\Http\Resources\InquiryResource;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    /**
     * POST /api/inquiries
     * Publik: form kontak di landing page mengirim ke sini.
     */
    public function store(StoreInquiryRequest $request): JsonResponse
    {
        $inquiry = Inquiry::create($request->validated());

        // TODO: kirim notifikasi email ke admin di sini kalau sudah butuh (Mail::to(...)->send(...))

        return (new InquiryResource($inquiry))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * GET /api/admin/inquiries
     * Admin: lihat semua inquiry yang masuk, bisa difilter status.
     */
    public function index(Request $request): JsonResponse
    {
        $inquiries = Inquiry::when(
            $request->query('status'),
            fn ($query, $status) => $query->where('status', $status)
        )
            ->latest()
            ->get();

        return InquiryResource::collection($inquiries)->response();
    }

    /**
     * PUT /api/admin/inquiries/{inquiry}
     * Admin: update status (new / in_progress / done).
     */
    public function update(Request $request, Inquiry $inquiry): JsonResponse
    {
        $request->validate([
            'status' => ['required', 'in:new,in_progress,done'],
        ]);

        $inquiry->update(['status' => $request->input('status')]);

        return (new InquiryResource($inquiry))->response();
    }

    /**
     * DELETE /api/admin/inquiries/{inquiry}
     */
    public function destroy(Inquiry $inquiry): JsonResponse
    {
        $inquiry->delete();

        return response()->json(['message' => 'Inquiry berhasil dihapus.']);
    }
}
