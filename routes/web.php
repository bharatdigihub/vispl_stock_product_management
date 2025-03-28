<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Default route redirects to the login page
Route::get('/', function () {
    return redirect('/login');
});

// Authentication routes
Route::get('/login', [AuthController::class, 'showLoginPage'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Dashboard route (requires authentication)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // User management routes (restricted to superadmin)
    Route::middleware([\App\Http\Middleware\SuperAdminMiddleware::class])->group(function () {
        // User routes
        Route::get('/users', [UserController::class, 'index'])->name('users.index'); // Add this line for listing users
        Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::patch('/users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

        // Role routes
        Route::get('/roles', [RoleController::class, 'index'])->name('roles.index'); // List roles
        Route::get('/roles/create', [RoleController::class, 'create'])->name('roles.create'); // Add role form
        Route::post('/roles', [RoleController::class, 'store'])->name('roles.store'); // Store role
        Route::get('/roles/{role}/edit', [RoleController::class, 'edit'])->name('roles.edit'); // Edit role form
        Route::patch('/roles/{role}', [RoleController::class, 'update'])->name('roles.update'); // Update role
        Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy'); // Delete role

        // Permission routes
        Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions.index'); // List permissions
        Route::get('/permissions/create', [PermissionController::class, 'create'])->name('permissions.create'); // Add permission form
        Route::post('/permissions', [PermissionController::class, 'store'])->name('permissions.store'); // Store permission
        Route::get('/permissions/{permission}/edit', [PermissionController::class, 'edit'])->name('permissions.edit'); // Edit permission form
        Route::patch('/permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update'); // Update permission
        Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy'); // Delete permission
    });

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// API routes
Route::get('/api/user/permissions', [UserController::class, 'getUserPermissions'])->name('user.permissions');
Route::get('/api/check-superadmin', [UserController::class, 'checkSuperAdmin'])->name('check.superadmin');

// Include authentication routes
require __DIR__ . '/auth.php';

Route::get('/test-log', function () {
    \Log::info('Test log message');
    return 'Log written';
});

Route::middleware(['superadmin'])->get('/test-superadmin', function () {
    return 'SuperAdmin middleware is working!';
});
