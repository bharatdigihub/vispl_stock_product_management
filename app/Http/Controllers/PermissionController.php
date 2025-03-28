<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;

class PermissionController extends Controller
{
    // Display a list of permissions
    public function index()
    {
        $permissions = Permission::all();
        return Inertia::render('Permissions/Index', compact('permissions'));
    }

    // Show the form for creating a new permission
    public function create()
    {
        return Inertia::render('Permissions/Create');
    }

    // Store a newly created permission in the database
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:permissions|max:255',
        ]);

        Permission::create(['name' => $request->name]);

        return redirect()->route('permissions.index')->with('success', 'Permission created successfully.');
    }

    // Show the form for editing a permission
    public function edit(Permission $permission)
    {
        return Inertia::render('Permissions/Edit', compact('permission'));
    }

    // Update the specified permission in the database
    public function update(Request $request, Permission $permission)
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name,' . $permission->id . '|max:255',
        ]);

        $permission->update(['name' => $request->name]);

        return redirect()->route('permissions.index')->with('success', 'Permission updated successfully.');
    }

    // Delete the specified permission from the database
    public function destroy(Permission $permission)
    {
        $permission->delete();

        return redirect()->route('permissions.index')->with('success', 'Permission deleted successfully.');
    }
}
