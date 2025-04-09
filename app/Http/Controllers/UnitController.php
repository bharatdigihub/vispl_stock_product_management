<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Color;
use App\Models\Gsm;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UnitController extends Controller
{
    // Display a list of users
    public function index()
    {
        $user = auth()->user();

        if ($user->hasRole('super-admin')) {
            // Superadmin can view all users
            //$units = Unit::all();
        } else {
            // Non-superadmin can only view their own data
            $users = User::where('id', $user->id)->get();
            //$units = Unit::all();
        }
        $units = Unit::select('units.*', 'parent.unitname as parent_name')
        ->leftJoin('units as parent', 'units.baseunitid', '=', 'parent.id')
        ->get();

        return Inertia::render('Units/Index', compact('units','users'));
    }

    // Show the form for creating a new user
    public function create()
    {

        //$colors = Role::all(); // Fetch all roles
        $permissions = Permission::all(); // Fetch all permissions
        $routes = [
            'store' => route('unit.store'),
             // Pass the store route explicitly
        ];
        $units = Unit::all();
       
    



        return Inertia::render('Units/Create', compact('permissions','units', 'routes')); // Pass routes to the view
    }

    // Store a newly created user in the database
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $unit = Unit::create([
            'unitname' => $request->name,
            'baseunitid' => $request->baseunitid,
            'unitrate' => $request->unitrate,
            'status' => 1,
            
        ]);

        // Assign role to user
       // $user->roles()->attach($request->role);

        return redirect()->route('unit.index')->with('success', 'New Unit added successfully.');
    }

    // Show the form for editing a user
    public function edit($unit)
    {
        $roles = Role::all();
        //$units =Unit::find($unit);
        $munits= Unit::select('units.*', 'parent.unitname as parent_name')
        ->where('units.id', '=', $unit)
        ->leftJoin('units as parent', 'units.baseunitid', '=', 'parent.id')
        ->get();
        //$units=json_encode($munits);
        $units = (object) $munits->first()->toArray();

        $routes = [
            'update' => route('unit.update'), // Pass the store route explicitly
        ];

        $primaryunits = Unit::all();
        
      

        return Inertia::render('Units/Edit', compact('roles','primaryunits', 'units','routes'));
    }

    // Update the specified user in the database
    public function update(Request $request)
    {
        $unitid=$request->unitid;
        $unit = Unit::find($unitid);
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $unit->unitname = $validated['name'];
        $unit->unitrate = $request->unitrate;
        $unit->baseunitid = $request->baseunitid;
        //$color->status = 1;
        $unit->update();

       

        return redirect()->route('unit.index')->with('success', 'Unit name updated successfully.');
    }

    // Delete the specified user from the database
    public function destroy($id)
    {
         // Find the item by ID or fail (throw an error if not found)
         $gsm = Gsm::find($id);

         // Delete the item
       
        $gsm->delete();
        return redirect()->route('gsm.index')->with('success', 'One GSM Size deleted successfully.');
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
