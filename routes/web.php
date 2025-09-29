<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/', function () {
    return Inertia::render('Home');
});

/* Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);
Route::post('/events', [EventController::class, 'store']);
Route::post('/events/{event}/boulders', [EventController::class, 'addBoulder']); */

Route::get('/events', function () {
    return Inertia::render('Events'); // nome del file Events.tsx
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
