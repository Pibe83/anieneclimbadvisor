<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Boulder extends Model
{
    protected $table = 'boulders';

    protected $fillable = [
        'name',
        'description',
        'difficulty',
        'latitude',
        'longitude',
        'user_id',
        'event_id',
    ];

    public $timestamps = true;

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relazione con User (opzionale)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relazione con Event (obbligatoria)
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Relazione con Difficulty
     */
    /*  public function difficulty()
    {
        return $this->belongsTo(Difficulty::class);
    } */

    /**
     * Relazione con Image[]
     */
    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
