<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BrandsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->has('only_trashed') && $request->only_trashed) {
            $brands = Brand::onlyTrashed()->get();
        } else {
            $brands = Brand::all();
        }

        return response()->json(['brands' => $brands]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand_name' => 'required|string',
            'warehouse_location' => 'required|string',
        ]);

        $brand = Brand::create($validated);

        return response()->json($brand, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $brand = Brand::findOrFail($id);

        $request->validate([
            'brand_name' => 'required|string',
            'warehouse_location' => 'required|string',
        ]);

        $brand->update([
            'brand_name' => $request->input('brand_name'),
            'warehouse_location' => $request->input('warehouse_location'),
        ]);

        return response()->json([
            'message' => 'Data updated successfully!',
            'brands' => $brand
        ], 200);
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(string $id)
    {
        $brand = Brand::findOrFail($id);
        $brand->delete();

        return response()->json(['message' => 'Brand archived (soft deleted) successfully.']);
    }

    /**
     * Restore a soft-deleted resource.
     */
    public function restore(string $id)
    {
        $brand = Brand::onlyTrashed()->findOrFail($id);
        $brand->restore();

        return response()->json(['message' => 'Brand restored successfully.']);
    }

    /**
     * Permanently delete a soft-deleted resource.
     */
    public function forceDelete(string $id)
    {
        $brand = Brand::onlyTrashed()->findOrFail($id);
        $brand->forceDelete();

        return response()->json(['message' => 'Brand permanently deleted successfully.']);
    }
}