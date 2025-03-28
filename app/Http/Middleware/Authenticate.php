<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo(Request $request): ?string
    {
        // Redirect unauthenticated users to the login page
        if (!$request->expectsJson()) {
            return route('login');
        }

        return null;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  ...string|null  $guards
     * @return mixed
     */
    public function handle($request, \Closure $next, ...$guards)
    {
        // Authenticate user
        $this->authenticate($request, $guards);

        // Add custom logic if needed
        return $next($request);
    }
}
