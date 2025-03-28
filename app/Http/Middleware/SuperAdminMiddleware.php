<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SuperAdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        \Log::info('SuperAdminMiddleware triggered for route: ' . $request->path());

        if (auth()->check() && auth()->user()->type === 'superadmin') {
            \Log::info('SuperAdminMiddleware passed for user: ' . auth()->user()->email);
            return $next($request);
        }

        \Log::warning('SuperAdminMiddleware failed for user: ' . (auth()->check() ? auth()->user()->email : 'Guest'));
        return redirect()->route('dashboard')->with('error', 'You are not authorized to access this page.');
    }
}