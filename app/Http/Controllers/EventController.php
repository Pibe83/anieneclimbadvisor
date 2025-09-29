<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;



class EventController extends Controller
{
    public function index()
    {
        return response()->json(Event::all());
    }

    public function show(Event $event)
    {
        return $event->load('boulders');
    }

    public function store(Request $request)
    {
        $event = Event::create($request->all());
        return $event;
    }

    public function addBoulder(Request $request, Event $event)
    {
        $boulder = $event->boulders()->create($request->all());
        return $boulder;
    }
}
