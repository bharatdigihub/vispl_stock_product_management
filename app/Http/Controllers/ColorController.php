<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Color;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class ColorController extends Controller
{
    // Display a list of users
    public function index()
    {
        $user = auth()->user();

        if ($user->hasRole('super-admin')) {
            // Superadmin can view all users
            $colors = Color::all();
        } else {
            // Non-superadmin can only view their own data
            $users = User::where('id', $user->id)->get();
            $colors = Color::all();
        }

        return Inertia::render('Colors/Index', compact('colors','users'));
    }

    // Show the form for creating a new user
    public function create()
    {

        //$colors = Role::all(); // Fetch all roles
        $permissions = Permission::all(); // Fetch all permissions
        $routes = [
            'store' => route('color.store'), // Pass the store route explicitly
        ];

        return Inertia::render('Colors/Create', compact('permissions', 'routes')); // Pass routes to the view
    }

    // Store a newly created user in the database
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $user = Color::create([
            'name' => $request->name,
            'status' => 1,
            
        ]);

        // Assign role to user
        $user->roles()->attach($request->role);

        return redirect()->route('color.index')->with('success', 'New Color added successfully.');
    }

    // Show the form for editing a user
    public function edit($color)
    {
        $roles = Role::all();
        $colors =Color::find($color);

        $routes = [
            'update' => route('color.update'), // Pass the store route explicitly
        ];
        
      

        return Inertia::render('Colors/Edit', compact('roles', 'colors','routes'));
    }

    // Update the specified user in the database
    public function update(Request $request)
    {
        $colorid=$request->colorid;
        $color = Color::find($colorid);
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $color->name = $validated['name'];
        //$color->status = 1;
        $color->update();

       

        return redirect()->route('color.index')->with('success', 'Color name updated successfully.');
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
