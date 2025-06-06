<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lists', function (Blueprint $table) {
            $table->id();
            $table->string('product_name')->nullable();
            $table->unsignedBigInteger('brand_id')->nullable(); // Add foreign key
            $table->string('size')->nullable();
            $table->string('category')->nullable();
            $table->string('color')->nullable();
            $table->string('unit_price')->nullable();
            $table->string('wholesale_price')->nullable();
            $table->string('market_price')->nullable();
            $table->string('stock_available')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraint
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lists');
    }
};