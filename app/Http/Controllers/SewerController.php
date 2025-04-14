<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Color;
use App\Models\Gsm;
use App\Models\Unit;
use App\Models\Size;
use App\Models\Sewer;
use App\Models\Productionhouse;
use App\Models\Productionunit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;

class SewerController extends Controller
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
       
        $sewers= DB::table('sewers')
    ->Join('units', 'sewers.unitid', '=', 'units.id')
    ->Join('productionhouses', 'sewers.productionhouseid', '=', 'productionhouses.id')
    ->Join('productionunits', 'sewers.productionunitid', '=', 'productionunits.id')
    ->select('sewers.id', 'sewers.name as sewername','sewers.manpower','sewers.unitprice','units.unitname','productionhouses.name as housename', 'productionunits.name as productionunitname')
    ->get();

        return Inertia::render('Sewers/Index', compact('users','sewers'));
    }

    // Show the form for creating a new user
    public function create()
    {

        //$colors = Role::all(); // Fetch all roles
        $permissions = Permission::all(); // Fetch all permissions
        $routes = [
            'store' => route('sewer.store'),
             // Pass the store route explicitly
        ];
        $units = Unit::all();
        $productionhouses = Productionhouse::all();
        $productionunits = Productionunit::all(); 

        return Inertia::render('Sewers/Create', compact('permissions','units','productionhouses','productionunits', 'routes')); // Pass routes to the view
    }

    // Store a newly created user in the database
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'manpower' => 'required|numeric',
            'unitprice' => 'required|numeric',
            'productionhouseid' => 'required|numeric',
            'productionunitid' => 'required|numeric',
            'unitid' => 'required|numeric',
        ]);

        $sewer = Sewer::create([
            'name' => $validated['name'],
            'unitid' => $validated['unitid'],
            'productionhouseid' => $validated['productionhouseid'],
            'productionunitid' => $validated['productionunitid'],
             'manpower' => $validated['manpower'],
            'unitprice' => $validated['unitprice'],
             'status' => 1,
            
        ]);

        // Assign role to user
       // $user->roles()->attach($request->role);

        return redirect()->route('sewer.index')->with('success', 'New Sewer added successfully.');
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
         $sewer = Sewer::find($id);

         // Delete the item
       
        $sewer->delete();
        return redirect()->route('sewer.index')->with('success', 'One  Sewer team deleted successfully.');
    }

   

   
   
}
