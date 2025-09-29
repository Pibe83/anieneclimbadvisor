<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';

    protected $fillable = [
        'name',
        'description',
        'date',
        'city',
        'latitude',
        'longitude',
    ];

    /* public $timestamps = false; */

    protected $casts = [
        'date' => 'datetime',
        'latitude' => 'float',
        'longitude' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relazione con Boulder
    public function boulders()
    {
        return $this->hasMany(Boulder::class);
    }
}
