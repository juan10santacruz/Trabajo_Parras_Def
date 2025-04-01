<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Institution extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'institution_type',
        'country',
        'city'
    ];

    public function teachers(): HasMany
    {
        return $this->hasMany(Teacher::class);
    }
}