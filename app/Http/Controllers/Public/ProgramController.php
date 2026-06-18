<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ProgramController extends Controller
{
    public function index(): Response
    {
        $programs = Program::published()
            ->orderBy('created_at', 'desc')
            ->get(['id', 'title', 'slug', 'category', 'excerpt', 'schedule', 'image']);

        return Inertia::render('public/program/index', [
            'programs' => $programs,
        ]);
    }

    public function show(string $slug): Response
    {
        $program = Program::published()
            ->where('slug', $slug)
            ->firstOrFail();

        $related = Program::published()
            ->where('slug', '!=', $slug)
            ->where('category', $program->category)
            ->limit(3)
            ->get(['id', 'title', 'slug', 'category', 'excerpt', 'schedule', 'image']);

        return Inertia::render('public/program/show', [
            'program' => $program,
            'related' => $related,
        ]);
    }
}
