<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\ServiceController;
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
        Route::get('/services/{service}', [ServiceController::class, 'show']);
        Route::post('/services', [ServiceController::class, 'store']);
        Route::put('/services/{service}', [ServiceController::class, 'update']);
        Route::delete('/services/{service}', [ServiceController::class, 'destroy']);

        Route::post('/portfolios', [PortfolioController::class, 'store']);
        Route::post('/portfolios/{portfolio}', [PortfolioController::class, 'update']); // pakai POST + _method=PUT karena upload file
        Route::delete('/portfolios/{portfolio}', [PortfolioController::class, 'destroy']);

        Route::post('/testimonials', [TestimonialController::class, 'store']);
        Route::post('/testimonials/{testimonial}', [TestimonialController::class, 'update']); // sama, ada upload foto
        Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy']);

        Route::get('/inquiries', [InquiryController::class, 'index']);
        Route::put('/inquiries/{inquiry}', [InquiryController::class, 'update']);
        Route::delete('/inquiries/{inquiry}', [InquiryController::class, 'destroy']);
    });
