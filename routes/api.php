<?php

use App\Http\Controllers\ListsController;
use App\Http\Controllers\BrandsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::apiResource('lists', ListsController::class);
Route::apiResource('brands', BrandsController::class);

// Custom routes for lists
Route::post('/lists/{id}/restore', [ListsController::class, 'restore'])->name('lists.restore');
Route::delete('/lists/{id}/force', [ListsController::class, 'forceDelete'])->name('lists.forceDelete');
Route::patch('/lists/{id}/stock', [ListsController::class, 'updateStock'])->name('lists.updateStock');

// Custom routes for brands
Route::post('/brands/{id}/restore', [BrandsController::class, 'restore'])->name('brands.restore');
Route::delete('/brands/{id}/force', [BrandsController::class, 'forceDelete'])->name('brands.forceDelete');


// Route::post('/api/export-csv', [GameController::class, 'exportCsv']);

// Backend route (Laravel example)
// Route::put('/games/restore/{gameId}', [GameController::class, 'restore']);

// Backend route (Laravel example)
// Route::patch('/api/game/{id}/restore', function ($id) {
//     $game = Game::withTrashed()->findOrFail($id);
//     $game->restore();
//     return response()->json(['message' => 'Game restored successfully']);
// });

// Route::post('/game/{id}/restore', [GameController::class, 'restore']);
?>