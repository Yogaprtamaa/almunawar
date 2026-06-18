<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $password = Str::password(16);

        User::updateOrCreate(
            ['email' => 'bintanghutabarat0204@gmail.com'],
            [
                'name'     => 'Bintang Hutabarat',
                'password' => Hash::make($password),
                'role'     => 'admin',
            ]
        );

        $this->command->info('');
        $this->command->info('  Admin account created:');
        $this->command->info('  Email    : bintanghutabarat0204@gmail.com');
        $this->command->info('  Password : ' . $password);
        $this->command->warn('  Simpan password ini sekarang — tidak akan ditampilkan lagi!');
        $this->command->info('');
    }
}
