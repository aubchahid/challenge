<?php

namespace App\Observers;

use App\Models\Group;
use Illuminate\Support\Facades\Log;

class GroupObserver
{
    public function created(Group $group): void
    {
        Log::info('Group created: ' . $group->name);
    }

    public function updated(Group $group): void
    {
        Log::info('Group updated: ' . $group->name);
    }

    public function deleted(Group $group): void
    {
        Log::info('Group deleted: ' . $group->name);
    }
}
