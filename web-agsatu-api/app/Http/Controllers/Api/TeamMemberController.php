<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeamMemberRequest;
use App\Http\Resources\TeamMemberResource;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class TeamMemberController extends Controller
{
    /**
     * GET /api/team
     * Publik: hanya yang aktif, terurut sesuai kolom "order".
     */
    public function index(): JsonResponse
    {
        $members = TeamMember::where('is_active', true)
            ->orderBy('order')
            ->get();

        return TeamMemberResource::collection($members)->response();
    }

    /**
     * GET /api/admin/team
     * Admin: lihat SEMUA data (aktif maupun non-aktif).
     */
    public function adminIndex(): JsonResponse
    {
        $members = TeamMember::orderBy('order')->get();

        return TeamMemberResource::collection($members)->response();
    }

    /**
     * POST /api/admin/team
     */
    public function store(StoreTeamMemberRequest $request): JsonResponse
    {
        $data = $request->safe()->except('photo');

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('team', 'public');
        }

        $member = TeamMember::create($data);

        return (new TeamMemberResource($member))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * PUT /api/admin/team/{teamMember}
     */
    public function update(StoreTeamMemberRequest $request, TeamMember $teamMember): JsonResponse
    {
        $data = $request->safe()->except('photo');

        if ($request->hasFile('photo')) {
            if ($teamMember->photo) {
                Storage::disk('public')->delete($teamMember->photo);
            }
            $data['photo'] = $request->file('photo')->store('team', 'public');
        }

        $teamMember->update($data);

        return (new TeamMemberResource($teamMember))->response();
    }

    /**
     * DELETE /api/admin/team/{teamMember}
     */
    public function destroy(TeamMember $teamMember): JsonResponse
    {
        if ($teamMember->photo) {
            Storage::disk('public')->delete($teamMember->photo);
        }

        $teamMember->delete();

        return response()->json(['message' => 'Anggota tim berhasil dihapus.']);
    }
}
