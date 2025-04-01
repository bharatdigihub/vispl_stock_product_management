<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\Module;
use Inertia\Inertia;

class RoleController extends Controller
{
    // Display a list of roles
    public function index()
    {
        
        \Log::info('RoleController@index called'); // Log the method call
        $roles = Role::with('permissions')->get(); // Fetch all roles with permissions from the database
        $routes = [
            'create' => route('roles.create'),
            'edit' => route('roles.edit', ':id'), // Placeholder for dynamic ID
            'destroy' => route('roles.destroy', ':id'), // Placeholder for dynamic ID
        ];
        return Inertia::render('Roles/Index', compact('roles', 'routes')); // Pass routes to the view
    }

    // Show the form for creating a new role
    public function create()
    {
        $modules = Module::with('permissions')->get(); // Fetch all modules with their permissions
        $routes = [
            'store' => route('roles.store'),
        ];

        return Inertia::render('Roles/Create', compact('modules', 'routes')); // Pass routes and modules to the view
    }

    // Store a newly created role in the database
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles|max:255',
            'permissions' => 'array|exists:permissions,id', // Validate permissions
        ]);

        $role = Role::create(['name' => $request->name, 'guard_name' => 'web']);
        $role->permissions()->sync($request->permissions); // Assign permissions to the role

        return redirect()->route('roles.index')->with('success', 'Role created successfully with permissions.');
    }

    // Show the form for editing a role
    public function edit(Role $role)
    {
        $modules = Module::with('permissions')->get(); // Fetch all modules with their permissions
        $rolePermissions = $role->permissions->pluck('id')->toArray(); // Get the role's current permissions
        $routes = [
            'update' => route('roles.update', $role->id),
        ];

        return Inertia::render('Roles/Edit', compact('role', 'modules', 'rolePermissions', 'routes')); // Pass routes, role data, and modules to the view
    }

    // Update the specified role in the database
    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $role->id . '|max:255',
            'permissions' => 'array|exists:permissions,id', // Validate permissions
        ]);

        $role->update(['name' => $request->name]);
        $role->permissions()->sync($request->permissions); // Update permissions for the role

        return redirect()->route('roles.index')->with('success', 'Role updated successfully with permissions.');
    }

    // Delete the specified role from the database
    public function destroy(Role $role)
    {
        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');
    }
}
