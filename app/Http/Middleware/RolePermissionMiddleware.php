<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RolePermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $routePermission
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $routePermission = null)
    {
        $user = Auth::user();

        // Check if the user is logged in
        if (!$user) {
            return redirect()->route('login');
        }

        // Check if the user has the required permission
        if ($routePermission && !$user->hasPermission($routePermission)) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
