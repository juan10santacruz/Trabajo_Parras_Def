<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Tabla pivote para la relación muchos a muchos entre tests e instituciones
        Schema::create('institution_test', function (Blueprint $table) {
            $table->foreignId('institution_id')->constrained()->onDelete('cascade');
            $table->foreignId('test_id')->constrained()->onDelete('cascade');
            $table->primary(['institution_id', 'test_id']);
            $table->timestamps();
        });

        // Tabla pivote para la relación muchos a muchos entre tests y usuarios (profesores)
        Schema::create('test_user', function (Blueprint $table) {
            $table->foreignId('test_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->primary(['test_id', 'user_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('test_user');
        Schema::dropIfExists('institution_test');
        Schema::dropIfExists('tests');
    }
};