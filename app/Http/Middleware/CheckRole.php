<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, string $role)
    {
        if (!$request->user()->roles()->where('slug', $role)->exists()) {
            abort(403);
        }

        return $next($request);
    }
}