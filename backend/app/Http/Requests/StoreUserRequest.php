<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string',
            'birthdate' => 'required|date',
            'phone_number' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'groups' => 'required|array|min:1',
        ];
    }
}
