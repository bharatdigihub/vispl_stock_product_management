<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Permission;
use App\Models\Module;
use Inertia\Inertia;

class PermissionController extends Controller
{
    // Display a list of permissions
    public function index()
    {
        $permissions = Permission::with('module')->get(); // Fetch permissions with module details
        $routes = [
            'create' => route('permissions.create'),
            'edit' => route('permissions.edit', ':id'), // Placeholder for dynamic ID
            'destroy' => route('permissions.destroy', ':id'), // Placeholder for dynamic ID
        ];
        return Inertia::render('Permissions/Index', compact('permissions', 'routes'));
    }

    // Show the form for creating a new permission
    public function create()
    {
        $modules = Module::all(); // Fetch all modules
        $routes = [
            'store' => route('permissions.store'),
        ];

        return Inertia::render('Permissions/Create', compact('modules', 'routes'));
    }

    // Store a newly created permission in the database
    public function store(Request $request)
    {
        $request->validate([
            'module_id' => 'required|exists:modules,id',
            'actions' => 'required|array|min:1', // Validate actions as an array
            'actions.*' => 'in:view,create,edit,delete', // Ensure each action is valid
        ]);

        foreach ($request->actions as $action) {
            Permission::firstOrCreate([
                'module_id' => $request->module_id,
                'action' => $action,
            ]);
        }

        return redirect()->route('permissions.index')->with('success', 'Permissions created successfully for the module.');
    }

    // Show the form for editing a permission
    public function edit(Permission $permission)
    {
        $modules = Module::all(); // Fetch all modules
        $routes = [
            'update' => route('permissions.update', $permission->id),
        ];

        return Inertia::render('Permissions/Edit', compact('permission', 'modules', 'routes'));
    }

    // Update the specified permission in the database
    public function update(Request $request, Permission $permission)
    {
        $request->validate([
            'module_id' => 'required|exists:modules,id',
            'action' => 'required|in:view,create,edit,delete',
        ]);

        $permission->update($request->only('module_id', 'action'));

        return redirect()->route('permissions.index')->with('success', 'Permission updated successfully.');
    }

    // Delete the specified permission from the database
    public function destroy(Permission $permission)
    {
        $permission->delete();

        return redirect()->route('permissions.index')->with('success', 'Permission deleted successfully.');
    }
}
