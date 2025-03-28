<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UpdateSuperAdminTypeSeeder extends Seeder
{
    public function run(): void
    {
        User::where('email', 'superadmin@example.com')->update(['type' => 'superadmin']);
    }
}
