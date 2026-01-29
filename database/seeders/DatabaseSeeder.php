<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::create(['name' => 'Administrator', 'slug' => 'admin']);
        $userRole = Role::create(['name' => 'Simple User', 'slug' => 'user']);

        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $admin->roles()->attach($adminRole);

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
        ]);
        $user->roles()->attach($userRole);

        User::factory(10)->create()->each(function ($u) use ($userRole) {
            $u->roles()->attach($userRole);
            
            Post::factory(3)->create(['user_id' => $u->id])->each(function ($post) {
                Comment::factory(2)->create([
                    'post_id' => $post->id,
                    'user_id' => User::inRandomOrder()->first()->id 
                ]);
            });
        });

        echo "Adatbázis feltöltve! \n";
        echo "Admin login: admin@example.com / password \n";
        echo "User login: user@example.com / password \n";
    }
}
