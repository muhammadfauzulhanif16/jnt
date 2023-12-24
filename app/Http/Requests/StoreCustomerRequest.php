<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'phone_number' => ['required', 'string', 'unique:customers'],
            'address' => ['required', 'string'],
            'address_distance' => ['required', 'integer'],
            'item_name' => ['required', 'string'],
            'item_type' => ['required', 'string', 'in:barang,dokumen'],
        ];
    }
}
