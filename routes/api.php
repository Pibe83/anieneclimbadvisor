<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\BoulderController;
use Illuminate\Support\Facades\Route;

// Event API
Route::get('events', [EventController::class, 'index']);
Route::get('events/{event}', [EventController::class, 'show']);
Route::post('events', [EventController::class, 'store']);
Route::post('events/{event}/boulders', [EventController::class, 'addBoulder']);

// Boulder API
Route::get('boulders', [BoulderController::class, 'index']);
Route::get('boulders/{boulder}', [BoulderController::class, 'show']);
Route::post('boulders', [BoulderController::class, 'store']);
Route::put('boulders/{boulder}', [BoulderController::class, 'update']);
Route::delete('boulders/{boulder}', [BoulderController::class, 'destroy']);
