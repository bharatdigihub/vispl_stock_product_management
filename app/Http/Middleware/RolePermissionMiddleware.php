<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RolePermissionMiddleware
{
    public function handle(Request $request, Closure $next, $permission)
    {
        if (auth()->check() && auth()->user()->can($permission)) {
            return $next($request);
        }

        return redirect()->route('dashboard')->with('error', 'You do not have permission to access this page.');
    }
}
