<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lists extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'lists';
    protected $guarded = [];

    // Define the relationship with Brand
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }
}