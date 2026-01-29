<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;

Route::middleware(['auth'])->group(function () {
    Route::get("/posts/create", [PostController::class, "create"])->name("posts.create");
    Route::get("/posts/{post}/edit", [PostController::class, "edit"])->name("posts.edit");
    Route::put("/posts/{post}", [PostController::class, "update"])->name("posts.update");
    Route::post("/posts", [PostController::class, "store"])->name("posts.store");
    Route::delete("/posts/{post}", [PostController::class, "destroy"])->name("posts.destroy");
});

Route::get("/posts", [PostController::class, "index"])->name("posts.index");

Route::post("/posts/{post}/comments", [CommentController::class, "store"])->name("comments.store");
Route::delete("/comments/{comment}", [CommentController::class, "destroy"])->name("comments.destroy");

Route::get("/posts/{post}", [PostController::class, "show"])->name("posts.show");

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');
