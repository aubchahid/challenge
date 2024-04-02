<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GroupController extends Controller
{
    public function index(): \Illuminate\Http\JsonResponse
    {
        try {
            $groups = Group::withCount('users')->get();
            return response()->json(['groups' => $groups], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(StoreGroupRequest $request): \Illuminate\Http\JsonResponse
    {
        try {

            $request->validated();

            DB::beginTransaction();

            $Group = Group::create($request->all());

            DB::commit();

            return response()->json(['group' => $Group], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show(string $id): \Illuminate\Http\JsonResponse
    {
        try {
            $group = Group::with('users')->find($id);
            return response()->json(['group' => $group], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(UpdateGroupRequest $request, string $id): \Illuminate\Http\JsonResponse
    {
        try {
            $request->validated();

            DB::beginTransaction();

            $group = Group::find($id);
            $group->update($request->all());

            $group->refresh();
            $group->load('users');

            DB::commit();

            return response()->json(['group' => $group], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    public function destroy(string $id): \Illuminate\Http\JsonResponse
    {
        try {
            $group = Group::find($id);
            $group->delete();
            return response()->json(['message' => 'Group deleted'], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
