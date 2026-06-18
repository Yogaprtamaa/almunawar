<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreGalleryAlbumRequest;
use App\Models\GalleryAlbum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryAlbumController extends Controller
{
    public function index(): Response
    {
        $albums = GalleryAlbum::withCount('photos')->latest()->paginate(15);

        return Inertia::render('admin/gallery/index', [
            'albums' => $albums,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/gallery/form');
    }

    public function store(StoreGalleryAlbumRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('gallery/covers', 'public');
        }

        GalleryAlbum::create($data);

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Album berhasil ditambahkan.');
    }

    public function show(GalleryAlbum $album): Response
    {
        $album->load(['photos' => fn ($q) => $q->orderBy('sort_order')]);

        return Inertia::render('admin/gallery/show', [
            'album' => $album,
        ]);
    }

    public function edit(GalleryAlbum $album): Response
    {
        return Inertia::render('admin/gallery/form', [
            'album' => $album,
        ]);
    }

    public function update(StoreGalleryAlbumRequest $request, GalleryAlbum $album): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            if ($album->cover_image) {
                Storage::disk('public')->delete($album->cover_image);
            }
            $data['cover_image'] = $request->file('cover_image')->store('gallery/covers', 'public');
        }

        $album->update($data);

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Album berhasil diperbarui.');
    }

    public function destroy(GalleryAlbum $album): RedirectResponse
    {
        foreach ($album->photos as $photo) {
            Storage::disk('public')->delete($photo->image_path);
        }

        if ($album->cover_image) {
            Storage::disk('public')->delete($album->cover_image);
        }

        $album->delete();

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Album berhasil dihapus.');
    }
}
