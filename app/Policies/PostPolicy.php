<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;

class PostPolicy
{
    /**
     * Ki frissítheti a posztot?
     * Csak a tulajdonos. (Az admin általában tartalmat moderál/töröl, nem szerkeszt).
     */
    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }

    /**
     * Ki törölheti a posztot?
     * A tulajdonos VAGY az Admin.
     */
    public function delete(User $user, Post $post): bool
    {
        return $user->id === $post->user_id || $user->hasRole('admin');
    }
}
