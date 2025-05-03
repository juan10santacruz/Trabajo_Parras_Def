<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'test_id',
        'text',
        'order'
    ];

    /**
     * Relación con el test al que pertenece la pregunta
     */
    public function test(): BelongsTo
    {
        return $this->belongsTo(Test::class);
    }

    /**
     * Relación con las respuestas de esta pregunta
     */
    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class);
    }
}