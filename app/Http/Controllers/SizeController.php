<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Color;
use App\Models\Gsm;
use App\Models\Unit;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;

class SizeController extends Controller
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

        $sizes= DB::table('sizes')
    ->leftJoin('units', 'sizes.unitid', '=', 'units.id')
    ->select('sizes.id', 'units.unitname','sizes.name', 'sizes.status')
    ->get();

        return Inertia::render('Sizes/Index', compact('users','sizes'));
    }

    // Show the form for creating a new user
    public function create()
    {

        //$colors = Role::all(); // Fetch all roles
        $permissions = Permission::all(); // Fetch all permissions
        $routes = [
            'store' => route('size.store'),
             // Pass the store route explicitly
        ];
        $units = Unit::all();
       
    



        return Inertia::render('Sizes/Create', compact('permissions','units', 'routes')); // Pass routes to the view
    }

    // Store a newly created user in the database
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $size = Size::create([
            'name' => $request->name,
            'unitid' => $request->unitid,
           
            'status' => 1,
            
        ]);

        // Assign role to user
       // $user->roles()->attach($request->role);

        return redirect()->route('size.index')->with('success', 'New Size added successfully.');
    }

    // Show the form for editing a user
    public function edit($size)
    {
        $roles = Role::all();
        //$units =Unit::find($unit);
        /*$msizes= Size::select('sizes.*', 'sizes.id as sizeid')
        ->where('sizes.id', '=', $size)
        ->leftJoin('units as parent', 'units.id', '=', 'sizes.unitid')
        ->get();*/

        $msizes= DB::table('sizes')
        ->leftJoin('units', 'sizes.unitid', '=', 'units.id')
        ->select('sizes.id', 'units.unitname','sizes.name', 'sizes.status', 'sizes.unitid')
        ->where('sizes.id', '=', $size)
        ->get();
      
       $sizes = $msizes;

        $routes = [
            'update' => route('size.update'), // Pass the store route explicitly
        ];

        $primaryunits = Unit::all();
        
      

        return Inertia::render('Sizes/Edit', compact('roles','primaryunits', 'sizes','routes'));
    }

    // Update the specified user in the database
    public function update(Request $request)
    {
        $sizeid=$request->sizeid;
        $size = Size::find($sizeid);
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $size->name = $validated['name'];
       
        $size->unitid = $request->unitid;
        //$color->status = 1;
        $size->update();

       

        return redirect()->route('size.index')->with('success', 'Size name updated successfully.');
    }

    // Delete the specified user from the database
    public function destroy($id)
    {
         // Find the item by ID or fail (throw an error if not found)
         $size = Size::find($id);

         // Delete the item
       
        $size->delete();
        return redirect()->route('size.index')->with('success', 'One  Size deleted successfully.');
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
