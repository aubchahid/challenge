<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        try {
            $users = User::with('groups')->get();
            return response()->json(['users' => $users], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    public function store(StoreUserRequest $request): \Illuminate\Http\JsonResponse
    {
        try {

            $request->validated();

            DB::beginTransaction();

            $user = User::create($request->all());
            $user->groups()->attach($request->groups);

            $user->refresh();
            $user->load('groups');

            DB::commit();

            return response()->json(['user' => $user], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    public function show(int $id): \Illuminate\Http\JsonResponse
    {
        try {
            $user = User::with('groups')->find($id);
            return response()->json($user, 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    public function update(UpdateUserRequest $request, int $id)
    {
        try {
            $request->validated();

            DB::beginTransaction();

            $user = User::find($id);
            $user->update($request->all());
            $user->refresh();
            $user->load('groups');

            DB::commit();

            return response()->json(['user' => $user], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    public function destroy(int $id)
    {
        try {
            DB::beginTransaction();

            $user = User::find($id);
            $user->groups()->detach();
            $user->delete();

            DB::commit();

            return response()->json('User deleted successfully', 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    public function attach(Request $request, int $id)
    {
        try {
            $user = User::find($id);
            $user->groups()->attach($request->group);
            $user->refresh();
            $user->load('groups');

            return response()->json(['user' => $user], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
