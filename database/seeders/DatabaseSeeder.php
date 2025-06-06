<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (!User::where('email', 'test@example.com')->exists()) {
            User::create([
                'username' => 'Test User',
                'email' => 'test@example.com',
                'firstname' => 'Super',
                'lastname' => 'Admin',
                'gender' => 'Male',
                'status' => 'Active'
            ]);
        }

        $this->call([
            ListSeeder::class,
            BrandSeeder::class,
        ]);
    }
}