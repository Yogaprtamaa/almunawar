<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\GalleryAlbum;
use App\Models\GalleryPhoto;
use App\Models\Program;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'programs'          => Program::count(),
                'programs_published' => Program::published()->count(),
                'articles'          => Article::count(),
                'articles_published' => Article::published()->count(),
                'albums'            => GalleryAlbum::count(),
                'photos'            => GalleryPhoto::count(),
            ],
            'recent_articles' => Article::latest()
                ->limit(5)
                ->get(['id', 'title', 'category', 'is_published', 'published_at']),
            'recent_programs' => Program::latest()
                ->limit(5)
                ->get(['id', 'title', 'category', 'is_published']),
        ]);
    }
}
