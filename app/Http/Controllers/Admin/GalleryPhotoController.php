<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreGalleryPhotoRequest;
use App\Models\GalleryAlbum;
use App\Models\GalleryPhoto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class GalleryPhotoController extends Controller
{
    public function store(StoreGalleryPhotoRequest $request, GalleryAlbum $album): RedirectResponse
    {
        $lastOrder = $album->photos()->max('sort_order') ?? 0;

        foreach ($request->file('photos') as $index => $file) {
            $path = $file->store('gallery/photos', 'public');

            $album->photos()->create([
                'image_path'  => $path,
                'caption'     => $request->input("captions.{$index}"),
                'sort_order'  => $lastOrder + $index + 1,
            ]);
        }

        return redirect()->route('admin.gallery.show', $album)
            ->with('success', 'Foto berhasil diupload.');
    }

    public function destroy(GalleryAlbum $album, GalleryPhoto $photo): RedirectResponse
    {
        // Pastikan foto memang milik album ini
        abort_if($photo->gallery_album_id !== $album->id, 403);

        Storage::disk('public')->delete($photo->image_path);
        $photo->delete();

        return redirect()->route('admin.gallery.show', $album)
            ->with('success', 'Foto berhasil dihapus.');
    }
}
