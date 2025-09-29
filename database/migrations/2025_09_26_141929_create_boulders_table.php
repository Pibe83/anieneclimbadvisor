<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('boulders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('difficulty');
            $table->float('latitude');
            $table->float('longitude');
            $table->timestamps();


            // Relazione con User (opzionale)
            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->onDelete('cascade');

            // Relazione con Event 
            $table->foreignId('event_id')
                ->constrained('events')
                ->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('boulders');
    }
};
