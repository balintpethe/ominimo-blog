<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{
    // GET /posts - Listázás
    public function index()
    {
        $posts = Post::with('user')->latest()->get();

        return Inertia::render('posts/index', [
            'posts' => $posts
        ]);
    }

    // GET /posts/{id} - Egy poszt megtekintése
    public function show(Post $post)
    {
        $post->load(['user', 'comments.user']);

        return Inertia::render('posts/show', [
            'post' => $post
        ]);
    }

    // GET /posts/create - Űrlap
    public function create()
    {
        return Inertia::render('posts/create');
    }

    // POST /posts - Mentés
    public function store(StorePostRequest $request)
    {
        $request->user()->posts()->create($request->validated());

        return redirect()->route('posts.index')->with('message', 'Post created successfully!');
    }

    // GET /posts/{id}/edit - Szerkesztés űrlap
    public function edit(Post $post)
    {   
        $this->authorize('update', $post);

        return Inertia::render('posts/edit', [
            'post' => $post
        ]);
    }

    // PUT /posts/{id} - Frissítés
    public function update(UpdatePostRequest $request, Post $post)
    {
        $this->authorize('update', $post);

        $post->update($request->validated());

        return redirect()->route('posts.index')->with('message', 'Post updated successfully!');
    }

    // DELETE /posts/{id} - Törlés
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        $post->delete();

        return redirect()->route('posts.index')->with('message', 'Post deleted successfully!');
    }
}
