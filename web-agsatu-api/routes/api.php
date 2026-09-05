<?php

use App\Http\Controllers\Api\Admin\ClientController;
use App\Http\Controllers\Api\Admin\ProjectController;
use App\Http\Controllers\Api\Admin\ProjectDocumentController;
use App\Http\Controllers\Api\Admin\ProjectMilestoneController;
use App\Http\Controllers\Api\AboutContentController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Client\ClientProjectController;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\TestimonialController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public routes — dipakai landing page (tidak butuh login)
|--------------------------------------------------------------------------
*/
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/portfolios', [PortfolioController::class, 'index']);
Route::get('/portfolios/{portfolio}', [PortfolioController::class, 'show']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/team', [TeamMemberController::class, 'index']);
Route::get('/about', [AboutContentController::class, 'index']);
Route::post('/inquiries', [InquiryController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Auth routes
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

/*
|--------------------------------------------------------------------------
| Admin routes — butuh login (Sanctum) + role admin
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:admin'])
    ->prefix('admin')
    ->group(function () {
        Route::get('/services', [ServiceController::class, 'adminIndex']);
        Route::get('/services/{service}', [ServiceController::class, 'show']);
        Route::post('/services', [ServiceController::class, 'store']);
        Route::put('/services/{service}', [ServiceController::class, 'update']);
        Route::delete('/services/{service}', [ServiceController::class, 'destroy']);

        Route::get('/portfolios', [PortfolioController::class, 'adminIndex']);
        Route::post('/portfolios', [PortfolioController::class, 'store']);
        Route::put('/portfolios/{portfolio}', [PortfolioController::class, 'update']); // request dari frontend tetap POST + _method=PUT, Laravel otomatis mengenalinya sebagai PUT
        Route::delete('/portfolios/{portfolio}', [PortfolioController::class, 'destroy']);

        Route::get('/testimonials', [TestimonialController::class, 'adminIndex']);
        Route::post('/testimonials', [TestimonialController::class, 'store']);
        Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update']); // sama, ada upload foto
        Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy']);

        Route::get('/team', [TeamMemberController::class, 'adminIndex']);
        Route::post('/team', [TeamMemberController::class, 'store']);
        Route::put('/team/{teamMember}', [TeamMemberController::class, 'update']); // sama, ada upload foto
        Route::delete('/team/{teamMember}', [TeamMemberController::class, 'destroy']);

        Route::get('/about', [AboutContentController::class, 'index']);
        Route::put('/about', [AboutContentController::class, 'update']);

        Route::get('/inquiries', [InquiryController::class, 'index']);
        Route::put('/inquiries/{inquiry}', [InquiryController::class, 'update']);
        Route::delete('/inquiries/{inquiry}', [InquiryController::class, 'destroy']);

        Route::get('/clients', [ClientController::class, 'index']);
        Route::post('/clients', [ClientController::class, 'store']);
        Route::put('/clients/{client}', [ClientController::class, 'update']);
        Route::delete('/clients/{client}', [ClientController::class, 'destroy']);

        Route::get('/projects', [ProjectController::class, 'index']);
        Route::get('/projects/{project}', [ProjectController::class, 'show']);
        Route::post('/projects', [ProjectController::class, 'store']);
        Route::put('/projects/{project}', [ProjectController::class, 'update']);
        Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

        Route::post('/projects/{project}/milestones', [ProjectMilestoneController::class, 'store']);
        Route::put('/milestones/{milestone}', [ProjectMilestoneController::class, 'update']);
        Route::delete('/milestones/{milestone}', [ProjectMilestoneController::class, 'destroy']);

        Route::post('/projects/{project}/documents', [ProjectDocumentController::class, 'store']);
        Route::delete('/documents/{document}', [ProjectDocumentController::class, 'destroy']);
    });

/*
|--------------------------------------------------------------------------
| Client routes — butuh login (Sanctum) + role client
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:client'])
    ->prefix('client')
    ->group(function () {
        Route::get('/projects', [ClientProjectController::class, 'index']);
        Route::get('/projects/{project}', [ClientProjectController::class, 'show']);
    });
