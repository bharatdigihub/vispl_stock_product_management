<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Color;
use App\Models\Gsm;
use App\Models\Unit;
use App\Models\Size;
use App\Models\Sewer;
use App\Models\Material;
use App\Models\Productionhouse;
use App\Models\Productionunit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;

class MaterialController extends Controller
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
       
        $materials = Material::all();

        return Inertia::render('Materials/Index', compact('users','materials'));
    }

    // Show the form for creating a new user
    public function create()
    {

        //$colors = Role::all(); // Fetch all roles
        $permissions = Permission::all(); // Fetch all permissions
        $routes = [
            'store' => route('material.store'), // Pass the store route explicitly
        ];

        return Inertia::render('Materials/Create', compact('permissions', 'routes')); // Pass routes to the view
    }
    // Store a newly created user in the database
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'opening' => 'required',
        ]);

        $materials = Material::create([
            'name' => $request->name,
            'opening' => $request->opening,
            'status' => 1,
            
        ]);

        // Assign role to user
        //$user->roles()->attach($request->role);

        return redirect()->route('material.index')->with('success', 'New Color added successfully.');
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
        
      

        return Inertia::render('Sewers/Edit', compact('roles','primaryunits', 'sizes','routes'));
    }

    // Update the specified user in the database
    public function update(Request $request)
    {
        $sewerid=$request->sewerid;
        $sewer = Sewer::find($sizeid);
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        //$size->name = $validated['name'];
       
       // $size->unitid = $request->unitid;
        //$color->status = 1;
        //$size->update();

       

        return redirect()->route('sewer.index')->with('success', 'Size name updated successfully.');
    }

    // Delete the specified user from the database
    public function destroy($id)
    {
         // Find the item by ID or fail (throw an error if not found)
         $material = Material::find($id);

         // Delete the item
       
         $material->delete();
        return redirect()->route('material.index')->with('success', 'One  Raw-material deleted successfully.');
    }

   

   
   
}
