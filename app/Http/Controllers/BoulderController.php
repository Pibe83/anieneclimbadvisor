<?php

namespace App\Http\Controllers;

use App\Models\Boulder;
use Illuminate\Http\Request;

class BoulderController extends Controller
{
    // Lista di tutti i boulder con relazioni
    public function index()
    {
        $boulders = Boulder::with(['event', 'user', 'images'])->get();
        return response()->json($boulders);
    }

    // Singolo boulder
    public function show(Boulder $boulder)
    {
        $boulder->load(['event', 'user', 'images']);
        return response()->json($boulder);
    }

    // Creazione nuovo boulder
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'difficulty' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'event_id' => 'required|exists:events,id',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $boulder = Boulder::create($data);

        return response()->json([
            'message' => 'Boulder creato con successo',
            'boulder' => $boulder,
        ], 201);
    }

    // Aggiornamento boulder
    public function update(Request $request, Boulder $boulder)
    {
        $data = $request->validate([
            'name' => 'sometimes|string',
            'description' => 'sometimes|string',
            'difficulty' => 'sometimes|string',
            'latitude' => 'sometimes|numeric',
            'longitude' => 'sometimes|numeric',
            'event_id' => 'sometimes|exists:events,id',
            'user_id' => 'sometimes|nullable|exists:users,id',
        ]);

        $boulder->update($data);

        return response()->json([
            'message' => 'Boulder aggiornato con successo',
            'boulder' => $boulder,
        ]);
    }

    // Cancellazione boulder
    public function destroy(Boulder $boulder)
    {
        $boulder->delete();

        return response()->json([
            'message' => 'Boulder eliminato con successo',
        ], 204);
    }
}
