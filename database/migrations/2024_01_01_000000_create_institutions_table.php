<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('institutions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->string('phone');
            $table->string('institution_type');
            $table->string('country');
            $table->string('city');
            $table->timestamps();
        });

        // Tabla pivote para la relación muchos a muchos entre instituciones y usuarios
        Schema::create('institution_user', function (Blueprint $table) {
            $table->foreignId('institution_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->primary(['institution_id', 'user_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('institution_user');
        Schema::dropIfExists('institutions');
    }
};