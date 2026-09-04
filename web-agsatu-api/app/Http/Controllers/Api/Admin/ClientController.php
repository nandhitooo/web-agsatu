<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ClientController extends Controller
{
    /**
     * GET /api/admin/clients
     */
    public function index(): JsonResponse
    {
        $clients = Client::with('user')->withCount('projects')->latest()->get();

        return ClientResource::collection($clients)->response();
    }

    /**
     * POST /api/admin/clients
     * Membuat akun User (role: client) sekaligus profil Client-nya.
     */
    public function store(StoreClientRequest $request): JsonResponse
    {
        $client = DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'client',
            ]);

            return Client::create([
                'user_id' => $user->id,
                'company_name' => $request->company_name,
                'phone' => $request->phone,
                'address' => $request->address,
            ]);
        });

        return (new ClientResource($client->load('user')))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * PUT /api/admin/clients/{client}
     */
    public function update(StoreClientRequest $request, Client $client): JsonResponse
    {
        DB::transaction(function () use ($request, $client) {
            $userData = [
                'name' => $request->name,
                'email' => $request->email,
            ];

            if ($request->filled('password')) {
                $userData['password'] = Hash::make($request->password);
            }

            $client->user()->update($userData);

            $client->update([
                'company_name' => $request->company_name,
                'phone' => $request->phone,
                'address' => $request->address,
            ]);
        });

        return (new ClientResource($client->fresh('user')))->response();
    }

    /**
     * DELETE /api/admin/clients/{client}
     * Menghapus Client otomatis menghapus User-nya juga (cascade dari migration).
     */
    public function destroy(Client $client): JsonResponse
    {
        $client->user()->delete();

        return response()->json(['message' => 'Klien berhasil dihapus.']);
    }
}
