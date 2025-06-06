<?php

namespace Database\Seeders;

use App\Models\Lists;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Lists::truncate();
        Lists::create([
            'product_name' => 'Trigem',
            // 'packaging_type' => 'lunch box',
            'size' => '10x10',
            'category' => 'Box',
            'color' => 'Red',
            'unit_price' => 'P10',
            'wholesale_price' => 'P100',
            'market_price' => 'P1000',
            'stock_available' => '10',
        ]);
    }
}
