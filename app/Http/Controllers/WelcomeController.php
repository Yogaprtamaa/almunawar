<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    public function __invoke(): Response
    {
        $featuredPrograms = Program::published()
            ->latest()
            ->limit(4)
            ->get(['id', 'title', 'slug', 'category', 'excerpt', 'schedule', 'image']);

        return Inertia::render('welcome', [
            'featuredPrograms' => $featuredPrograms,
        ]);
    }
}
