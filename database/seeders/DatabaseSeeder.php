<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        $superAdmin = Role::create(['name' => 'super-admin']);
        $permissions = ['manage users', 'assign roles', 'update permissions'];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $superAdmin->syncPermissions($permissions);

        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin1@example.com',
            'password' => Hash::make('superadm1n'),
            'type' => 'superadmin',
        ]);
    }
}

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call other seeders here
        $this->call(RolePermissionSeeder::class);

        // Add a dummy superadmin user
        User::firstOrCreate(
            ['email' => 'dummy.superadmin@example.com'],
            [
                'name' => 'Dummy Super Admin',
                'password' => Hash::make('dummyadmin123'),
                'type' => 'superadmin',
            ]
        );
    }
}

