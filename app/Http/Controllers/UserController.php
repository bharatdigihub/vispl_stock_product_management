<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserController extends Controller
{
    // Display a list of users
    public function index()
    {
        $user = auth()->user();

        if ($user->hasRole('super-admin')) {
            // Superadmin can view all users
            $users = User::all();
        } else {
            // Non-superadmin can only view their own data
            $users = User::where('id', $user->id)->get();
        }

        return Inertia::render('Users/Index', compact('users'));
    }

    // Show the form for creating a new user
    public function create()
    {
        \Log::info('UserController@create method triggered');

        $roles = Role::all(); // Fetch all roles
        $permissions = Permission::all(); // Fetch all permissions

        return Inertia::render('Users/Create', compact('roles', 'permissions'));
    }

    // Store a newly created user in the database
    public function store(Request $request)
    {
        if (auth()->user()->type !== 'superadmin') {
            return redirect()->route('dashboard')->with('error', 'You are not authorized to perform this action.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|exists:roles,name',
            'permissions' => 'array|exists:permissions,name',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->role);

        if ($request->has('permissions')) {
            $user->syncPermissions($request->permissions);
        }

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    // Show the form for editing a user
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', compact('user'));
    }

    // Update the specified user in the database
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    // Delete the specified user from the database
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

    // Fetch all permissions for the authenticated user
    public function getUserPermissions()
    {
        $permissions = auth()->user()->getAllPermissions()->pluck('name');
        return response()->json($permissions);
    }

    // Check if the authenticated user is a superadmin
    public function checkSuperAdmin()
    {
        $user = auth()->user();

        if ($user->type === 'superadmin') {
            return response()->json(['message' => 'User is a superadmin']);
        }

        return response()->json(['message' => 'User is not a superadmin']);
    }

    // Create a user by the superadmin
    public function createBySuperAdmin(Request $request)
    {
        if (auth()->user()->type !== 'superadmin') {
            return redirect()->route('dashboard')->with('error', 'You are not authorized to perform this action.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|exists:roles,name',
            'permissions' => 'array|exists:permissions,name',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->role);

        if ($request->has('permissions')) {
            $user->syncPermissions($request->permissions);
        }

        return redirect()->route('users.index')->with('success', 'User created successfully by superadmin.');
    }
}
