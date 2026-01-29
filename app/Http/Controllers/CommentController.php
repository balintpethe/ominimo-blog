<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Http\Requests\StoreCommentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    // POST /posts/{id}/comments
    public function store(StoreCommentRequest $request, Post $post)
    {
    $data = $request->validated();

    $data['post_id'] = $post->id;

    if (Auth::check()) {
        $data['user_id'] = Auth::id();
    }

    Comment::create($data);

    return redirect()->route('posts.show', $post)
        ->with('message', 'Comment added successfully!');
    }

    // DELETE /comments/{id}
    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);

        $comment->delete();
        return back()->with('message', 'Comment deleted successfully!');
    }
}
