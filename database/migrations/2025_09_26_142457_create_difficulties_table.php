<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('difficulties', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // "facile", "medio", "difficile"
            $table->timestamps();
        });

        // Popoliamo subito la tabella
        DB::table('difficulties')->insert([
            ['name' => 'facile'],
            ['name' => 'medio'],
            ['name' => 'difficile'],
        ]);
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('difficulties');
    }
};
