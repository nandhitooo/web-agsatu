<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAboutContentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'headline' => ['required', 'string', 'max:255'],
            'description_1' => ['nullable', 'string'],
            'description_2' => ['nullable', 'string'],
            'highlight_title' => ['nullable', 'string', 'max:255'],
            'highlight_description' => ['nullable', 'string'],
            'tech_badges' => ['nullable', 'array'],
            'tech_badges.*' => ['string', 'max:50'],
            'features' => ['nullable', 'array'],
            'features.*.title' => ['required_with:features', 'string', 'max:255'],
            'features.*.description' => ['nullable', 'string'],
        ];
    }
}
