<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    /**
     * GET /api/admin/projects
     */
    public function index(): JsonResponse
    {
        $projects = Project::with('client.user')->latest()->get();

        return ProjectResource::collection($projects)->response();
    }

    /**
     * GET /api/admin/projects/{project}
     */
    public function show(Project $project): JsonResponse
    {
        $project->load(['client.user', 'milestones', 'documents.uploader']);

        return (new ProjectResource($project))->response();
    }

    /**
     * POST /api/admin/projects
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {
        $project = Project::create($request->validated());

        return (new ProjectResource($project->load('client.user')))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * PUT /api/admin/projects/{project}
     */
    public function update(StoreProjectRequest $request, Project $project): JsonResponse
    {
        $project->update($request->validated());

        return (new ProjectResource($project->load('client.user')))->response();
    }

    /**
     * DELETE /api/admin/projects/{project}
     */
    public function destroy(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json(['message' => 'Proyek berhasil dihapus.']);
    }
}
