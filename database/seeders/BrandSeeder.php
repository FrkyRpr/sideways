<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Brand::truncate();
        Brand::create([
            'brand_name' => 'Trigem',
            'warehouse_location' => 'Ochoa',
        ]);
    }
}