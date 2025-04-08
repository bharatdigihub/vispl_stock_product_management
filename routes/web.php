<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\GsmController;
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
        return Inertia::render('/Dashboard/Dashboard'); // Ensure this matches the frontend component
    })->name('dashboard');

    // User routes
    Route::get('/users', [UserController::class, 'index'])->name('users.index'); // Add this line for listing users
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::patch('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // Menu routes
    Route::get('/menus', [\App\Http\Controllers\MenuController::class, 'index'])->name('menus.index'); // List menus
    Route::get('/menus/create', [\App\Http\Controllers\MenuController::class, 'create'])->name('menus.create'); // Add menu form
    Route::post('/menus', [\App\Http\Controllers\MenuController::class, 'store'])->name('menus.store'); // Store menu
    Route::get('/menus/{menu}/edit', [\App\Http\Controllers\MenuController::class, 'edit'])->name('menus.edit'); // Edit menu form
    Route::patch('/menus/{menu}', [\App\Http\Controllers\MenuController::class, 'update'])->name('menus.update'); // Update menu
    Route::delete('/menus/{menu}', [\App\Http\Controllers\MenuController::class, 'destroy'])->name('menus.destroy'); // Delete menu

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Color routes
    Route::get('/color', [ColorController::class, 'index'])->name('color.index'); // Add this line for listing users
    Route::get('/color/create', [ColorController::class, 'create'])->name('color.create');
    Route::post('/color', [ColorController::class, 'store'])->name('color.store');
    Route::get('/color/{color}/edit', [ColorController::class, 'edit'])->name('color.edit');
    Route::patch('/color', [ColorController::class, 'update'])->name('color.update');
    Route::delete('/color/{color}', [ColorController::class, 'destroy'])->name('color.destroy');

    Route::get('/gsm', [GsmController::class, 'index'])->name('gsm.index'); // Add this line for listing users
    Route::get('/gsm/create', [GsmController::class, 'create'])->name('gsm.create');
    Route::post('/gsm', [GsmController::class, 'store'])->name('gsm.store');
    Route::get('/gsm/{gsm}/edit', [GsmController::class, 'edit'])->name('gsm.edit');
    Route::patch('/gsm', [GsmController::class, 'update'])->name('gsm.update');
    Route::get('/gsm/{gsm}/delete', [GsmController::class, 'destroy'])->name('gsm.destroy');


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

