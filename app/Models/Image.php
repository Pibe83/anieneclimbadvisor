<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = 'images';

    protected $fillable = [
        'url',
        'public_id',
        'boulder_id',
    ];

    public $timestamps = false; // perché usi uploaded_at al posto di created_at/updated_at

    protected $casts = [
        'uploaded_at' => 'datetime',
    ];

    // Relazione con Boulder
    public function boulder()
    {
        return $this->belongsTo(Boulder::class);
    }
}
