<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;

class CommentPolicy
{
    /**
     * Ki törölhet egy kommentet?
     */
    public function delete(User $user, Comment $comment): bool
    {
        // 1. A komment írója
        if ($user->id === $comment->user_id) {
            return true;
        }

        // 2. A POSZT tulajdonosa
        if ($user->id === $comment->post->user_id) {
            return true;
        }

        // 3. Az ADMIN
        if ($user->hasRole('admin')) {
            return true;
        }

        return false;
    }
}
