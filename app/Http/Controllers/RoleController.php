<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;

class RoleController extends Controller
{
    // Display a list of roles
    public function index()
    {
        \Log::info('RoleController@index called'); // Log the method call
        $roles = Role::all(); // Fetch all roles from the database
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
        return Inertia::render('Roles/Create'); // Updated path for Create
    }

    // Store a newly created role in the database
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles|max:255',
        ]);

        Role::create(['name' => $request->name]);

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }

    // Show the form for editing a role
    public function edit(Role $role)
    {
        return Inertia::render('Roles/Edit', compact('role')); // Updated path for Edit
    }

    // Update the specified role in the database
    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $role->id . '|max:255',
        ]);

        $role->update(['name' => $request->name]);

        return redirect()->route('roles.index')->with('success', 'Role updated successfully.');
    }

    // Delete the specified role from the database
    public function destroy(Role $role)
    {
        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');
    }
}
