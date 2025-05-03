<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Test extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];

    /**
     * Relación muchos a muchos con instituciones
     */
    public function institutions(): BelongsToMany
    {
        return $this->belongsToMany(Institution::class);
    }

    /**
     * Relación muchos a muchos con usuarios (profesores)
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
    
    /**
     * Relación con las preguntas de este test
     */
    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }
}