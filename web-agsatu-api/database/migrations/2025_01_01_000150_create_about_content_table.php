<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_content', function (Blueprint $table) {
            $table->id();
            $table->string('headline');
            $table->text('description_1')->nullable();
            $table->text('description_2')->nullable();
            $table->string('highlight_title')->nullable();
            $table->text('highlight_description')->nullable();
            $table->json('tech_badges')->nullable();
            $table->json('features')->nullable(); // [{title, description}, ...]
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_content');
    }
};
