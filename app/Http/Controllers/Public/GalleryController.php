<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\GalleryAlbum;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $albums = GalleryAlbum::published()
            ->withCount('photos')
            ->orderBy('created_at', 'desc')
            ->get(['id', 'title', 'slug', 'cover_image', 'description']);

        return Inertia::render('public/galeri', [
            'albums' => $albums,
        ]);
    }
}
