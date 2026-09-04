<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectMilestone;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectMilestoneController extends Controller
{
    /**
     * POST /api/admin/projects/{project}/milestones
     */
    public function store(Request $request, Project $project): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:pending,in_progress,done'],
            'due_date' => ['nullable', 'date'],
            'order' => ['nullable', 'integer', 'min:0'],
        ]);

        $data['completed_at'] = $data['status'] === 'done' ? now() : null;

        $milestone = $project->milestones()->create($data);

        return response()->json($milestone, 201);
    }

    /**
     * PUT /api/admin/milestones/{milestone}
     */
    public function update(Request $request, ProjectMilestone $milestone): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:pending,in_progress,done'],
            'due_date' => ['nullable', 'date'],
            'order' => ['nullable', 'integer', 'min:0'],
        ]);

        // Catat otomatis kapan selesai, dan bersihkan lagi kalau statusnya diubah balik.
        if ($data['status'] === 'done' && $milestone->status !== 'done') {
            $data['completed_at'] = now();
        } elseif ($data['status'] !== 'done') {
            $data['completed_at'] = null;
        }

        $milestone->update($data);

        return response()->json($milestone);
    }

    /**
     * DELETE /api/admin/milestones/{milestone}
     */
    public function destroy(ProjectMilestone $milestone): JsonResponse
    {
        $milestone->delete();

        return response()->json(['message' => 'Milestone berhasil dihapus.']);
    }
}
