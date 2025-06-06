<?php

namespace App\Http\Controllers;

use App\Models\Lists;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ListsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->has('only_trashed') && $request->only_trashed) {
            $lists = Lists::onlyTrashed()->with('brand')->get();
        } else {
            $lists = Lists::with('brand')->get();
        }

        return response()->json(['lists' => $lists]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'required|string',
            'brand_id' => 'nullable|exists:brands,id', // Validate brand_id
            'size' => 'required|string',
            'category' => 'required|string',
            'color' => 'required|string',
            'unit_price' => 'required|numeric',
            'wholesale_price' => 'required|numeric',
            'market_price' => 'required|numeric',
            'stock_available' => 'required|numeric',
        ]);

        $list = Lists::create($validated);

        // Load the brand relationship for the response
        $list->load('brand');

        return response()->json($list, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $lists = Lists::findOrFail($id);

        $request->validate([
            'product_name' => 'required|string',
            'brand_id' => 'nullable|exists:brands,id', // Validate brand_id
            'size' => 'required|string',
            'category' => 'required|string',
            'color' => 'required|string',
            'unit_price' => 'required|numeric',
            'wholesale_price' => 'required|numeric',
            'market_price' => 'required|numeric',
            'stock_available' => 'required|numeric',
        ]);

        $lists->update([
            'product_name' => $request->input('product_name'),
            'brand_id' => $request->input('brand_id'),
            'size' => $request->input('size'),
            'category' => $request->input('category'),
            'color' => $request->input('color'),
            'unit_price' => $request->input('unit_price'),
            'wholesale_price' => $request->input('wholesale_price'),
            'market_price' => $request->input('market_price'),
            'stock_available' => $request->input('stock_available'),
        ]);

        // Load the brand relationship for the response
        $lists->load('brand');

        return response()->json([
            'message' => 'Data updated successfully!',
            'lists' => $lists
        ], 200);
    }

    /**
     * Update stock for a specific resource.
     */
    public function updateStock(Request $request, string $id)
    {
        $lists = Lists::findOrFail($id);

        $request->validate([
            'stock_available' => 'required|numeric|min:0',
        ]);

        $lists->update([
            'stock_available' => $request->input('stock_available'),
        ]);

        // Load the brand relationship for the response
        $lists->load('brand');

        return response()->json([
            'message' => 'Stock updated successfully!',
            'lists' => $lists
        ], 200);
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(string $id)
    {
        $list = Lists::findOrFail($id);
        $list->delete();

        return response()->json(['message' => 'Product archived (soft deleted) successfully.']);
    }

    /**
     * Restore a soft-deleted resource.
     */
    public function restore(string $id)
    {
        $list = Lists::onlyTrashed()->findOrFail($id);
        $list->restore();

        return response()->json(['message' => 'Product restored successfully.']);
    }

    /**
     * Permanently delete a soft-deleted resource.
     */
    public function forceDelete(string $id)
    {
        $list = Lists::onlyTrashed()->findOrFail($id);
        $list->forceDelete();

        return response()->json(['message' => 'Product permanently deleted successfully.']);
    }
}