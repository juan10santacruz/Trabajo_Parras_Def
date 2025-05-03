<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'user_id',
        'value'
    ];

    /**
     * Los valores posibles para las respuestas
     */
    public static $values = ['Malo', 'Regular', 'Bueno', 'Excelente'];

    /**
     * Relación con la pregunta a la que pertenece esta respuesta
     */
    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }

    /**
     * Relación con el usuario (profesor) que dio esta respuesta
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}