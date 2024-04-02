<?php

namespace App\Observers;

use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserObserver
{
    public function created(User $user): void
    {
        Log::info('User created successfully', ['user' => $user]);
    }

    public function updated(User $user): void
    {
        Log::info('User updated successfully', ['user' => $user]);
    }

    public function deleted(User $user): void
    {
        Log::info('User deleted successfully', ['user' => $user]);
    }
}
