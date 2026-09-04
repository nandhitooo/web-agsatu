<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClientProjectController extends Controller
{
    /**
     * GET /api/client/projects
     * Hanya menampilkan proyek milik klien yang sedang login.
     */
    public function index(Request $request): JsonResponse
    {
        $client = $request->user()->client;

        if (! $client) {
            return response()->json(['data' => []]);
        }

        $projects = $client->projects()->latest()->get();

        return ProjectResource::collection($projects)->response();
    }

    /**
     * GET /api/client/projects/{project}
     * Dijaga: klien cuma bisa lihat detail proyek MILIKNYA SENDIRI,
     * bukan sembarang project_id.
     */
    public function show(Request $request, Project $project): JsonResponse
    {
        $client = $request->user()->client;

        if (! $client || $project->client_id !== $client->id) {
            return response()->json(['message' => 'Proyek tidak ditemukan.'], 404);
        }

        $project->load(['milestones', 'documents.uploader']);

        return (new ProjectResource($project))->response();
    }
}
