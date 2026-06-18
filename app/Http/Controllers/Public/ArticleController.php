<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(): Response
    {
        $articles = Article::published()
            ->orderBy('published_at', 'desc')
            ->get(['id', 'title', 'slug', 'category', 'author', 'excerpt', 'image', 'published_at']);

        return Inertia::render('public/berita/index', [
            'articles' => $articles,
        ]);
    }

    public function show(string $slug): Response
    {
        $article = Article::published()
            ->where('slug', $slug)
            ->firstOrFail();

        $related = Article::published()
            ->where('slug', '!=', $slug)
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get(['id', 'title', 'slug', 'category', 'author', 'excerpt', 'image', 'published_at']);

        return Inertia::render('public/berita/show', [
            'article' => $article,
            'related' => $related,
        ]);
    }
}
