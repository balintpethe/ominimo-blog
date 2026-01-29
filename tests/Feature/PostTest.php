<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Megjelenik a blog főoldala?
     */
    public function test_blog_index_page_is_displayed(): void
    {
        $posts = Post::factory()->count(3)->create();

        $response = $this->get('/posts');

        $response->assertStatus(200);
    }

    /**
     * Bejelentkezett felhasználó tud posztolni?
     */
    public function test_auth_user_can_create_post(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('/posts', [
                'title' => 'Teszt Cím',
                'content' => 'Ez egy automatikus teszt tartalom.',
            ]);

        // Sikeres átirányítás a főoldalra?
        $response->assertRedirect('/posts');

        // Benne van az adatbázisban?
        $this->assertDatabaseHas('posts', [
            'title' => 'Teszt Cím',
            'user_id' => $user->id,
        ]);
    }

    /**
     * Vendég (nem bejelentkezett) NEM tud posztolni?
     */
    public function test_guest_cannot_create_post(): void
    {
        $response = $this->post('/posts', [
            'title' => 'Hacker Cím',
            'content' => 'Ezt nem kéne engedni.',
        ]);

        // Átirányít a loginra?
        $response->assertRedirect('/login');

        // NINCS az adatbázisban?
        $this->assertDatabaseMissing('posts', [
            'title' => 'Hacker Cím',
        ]);
    }

    /**
     * Felhasználó törölheti a saját posztját?
     */
    public function test_user_can_delete_own_post(): void
    {
        $user = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id]);

        $response = $this
            ->actingAs($user)
            ->delete("/posts/{$post->id}");

        $response->assertRedirect('/posts');
        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }

    /**
     * Felhasználó NEM törölheti MÁS posztját?
     */
    public function test_user_cannot_delete_others_post(): void
    {
        $owner = User::factory()->create();
        $attacker = User::factory()->create();
        
        $post = Post::factory()->create(['user_id' => $owner->id]);

        $response = $this
            ->actingAs($attacker)
            ->delete("/posts/{$post->id}");

        $response->assertStatus(403);
        
        $this->assertDatabaseHas('posts', ['id' => $post->id]);
    }
}
