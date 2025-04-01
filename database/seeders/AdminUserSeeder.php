<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        // Create Admin Role
        $adminRole = Role::firstOrCreate(
            ['name' => 'Admin'],
            ['guard_name' => 'web'] // Include guard_name
        );

        // Create Dummy Admin User
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'], // Unique email
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'), // Default password
                'type' => 'superadmin', // Set type to superadmin
            ]
        );

        // Assign Admin Role to the User
        $adminUser->assignRole($adminRole);
    }
}
