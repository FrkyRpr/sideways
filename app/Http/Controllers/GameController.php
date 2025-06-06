<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->query('only_trashed', false)) {
            $game = Game::onlyTrashed()->get();
        } else {
            $game = Game::all();
        }

        return response()->json([
            'game' => $game
        ]);
    }

    



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

     
    public function store()
    {
        try {
            $validated = request()->validate([
                'name' => ['required', 'min:3'],
                'genre' => ['required', 'min:2'],
                'developer' => ['required', 'min:3'],
                'rating' => ['required'],
            ]);



            $game = Game::create([
                'name' => $validated['name'],
                'genre' => $validated['genre'],
                'developer' => $validated['developer'],
                'rating' => $validated['rating'],
            ]);

            return response()->json([
                'message' => 'Game created successfully',
                'game' => $game
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server Error: ' . $e->getMessage()
            ], 500);
        }
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
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Game $game)
    {
        request()->validate([
            'name'  => ['required', 'min:3'],
            'genre' => ['required', 'min:2'],
            'developer' => ['required', 'min:3'],
            'rating' => ['required'],
        ]);

        $game->update([
            'name'  => request('name'),
            'genre' => request('genre'),
            'developer' => request('developer'),
            'rating' => request('rating'),
        ]);

        return response()->json([
            'message' => 'Game updated successfully!',
            'game'     => $game
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return void
     */
    public function destroy(Game $game)
    {
        $game->delete();
    }


    //restore

    // public function restore($id)
    // {
    //     $game = Game::withTrashed()->find($id);
        
    //     if ($game) {
    //         $game->restore();
    //         return response()->json(['message' => 'Game restored successfully']);
    //     }

    //     return response()->json(['message' => 'Game not found'], 404);
    // }


    public function restore($gameId)
    {
        // Find the archived game
        $archivedGame = Game::onlyTrashed()->find($gameId);

        if (!$archivedGame) {
            return response()->json(['message' => 'Game not found in archive'], 404);
        }

        // Restore the game
        $archivedGame->restore();

        return response()->json(['message' => 'Game restored successfully', 'game' => $archivedGame]);
    }

    // public function restore($id)
    // {
    //     $game = Game::onlyTrashed()->findOrFail($id);
    //     $game->restore();
    //     return response()->json(['message' => 'Game restored successfully'], 200);
    // }

}
