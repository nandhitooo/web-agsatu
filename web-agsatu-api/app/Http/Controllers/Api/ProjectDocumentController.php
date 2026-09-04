<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectDocument;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectDocumentController extends Controller
{
    /**
     * POST /api/admin/projects/{project}/documents
     */
    public function store(Request $request, Project $project): JsonResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'max:10240'], // maks 10MB
            'type' => ['required', 'in:proposal,bast,deliverable,lainnya'],
        ]);

        $file = $request->file('file');
        $path = $file->store('project-documents', 'public');

        $document = $project->documents()->create([
            'uploaded_by' => $request->user()->id,
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'type' => $request->type,
        ]);

        return response()->json([
            'id' => $document->id,
            'file_name' => $document->file_name,
            'type' => $document->type,
            'url' => url(Storage::url($document->file_path)),
        ], 201);
    }

    /**
     * DELETE /api/admin/documents/{document}
     */
    public function destroy(ProjectDocument $document): JsonResponse
    {
        Storage::disk('public')->delete($document->file_path);
        $document->delete();

        return response()->json(['message' => 'Dokumen berhasil dihapus.']);
    }
}
