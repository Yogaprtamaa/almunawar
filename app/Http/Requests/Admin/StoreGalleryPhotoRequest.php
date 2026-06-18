<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreGalleryPhotoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    /** @return array<string, ValidationRule|array<mixed>|string> */
    public function rules(): array
    {
        return [
            'photos'             => ['required', 'array', 'min:1', 'max:20'],
            'photos.*'           => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'captions'           => ['nullable', 'array'],
            'captions.*'         => ['nullable', 'string', 'max:255'],
        ];
    }
}
