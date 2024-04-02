<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function __invoke(LoginRequest $request)
    {
        try {
            if (Auth::attempt($request->all(), true)) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;

                $user->update(['token' => $token]);

                Log::info('User logged in', ['user' => $user->id]);

                return response()->json(['user' => $user, 'token' => $token], 200);
            } else {
                return response()->json(['message' => 'Credentials not match'], 401);
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
