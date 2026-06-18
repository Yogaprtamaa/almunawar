<?php

use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\GalleryAlbumController;
use App\Http\Controllers\Admin\GalleryPhotoController;
use App\Http\Controllers\Admin\ProgramController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public site (donatur-facing) — UI prototype
|--------------------------------------------------------------------------
| Data is currently mocked on the front-end (resources/js/lib/mock-data.ts).
| Replace with tenant-scoped controller props when wiring the backend.
*/

Route::get('/', fn () => Inertia::render('welcome'))->name('home');

Route::get('/profil', fn () => Inertia::render('public/profil'))->name('profil');

Route::get('/program', fn () => Inertia::render('public/program/index'))->name('program.index');
Route::get('/program/{slug}', fn (string $slug) => Inertia::render('public/program/show', ['slug' => $slug]))->name('program.show');

Route::get('/berita', fn () => Inertia::render('public/berita/index'))->name('berita.index');
Route::get('/berita/{slug}', fn (string $slug) => Inertia::render('public/berita/show', ['slug' => $slug]))->name('berita.show');

Route::get('/galeri', fn () => Inertia::render('public/galeri'))->name('galeri');
Route::get('/kontak', fn () => Inertia::render('public/kontak'))->name('kontak');
Route::get('/donasi', fn () => Inertia::render('public/donasi/index'))->name('donasi.index');

/*
|--------------------------------------------------------------------------
| Admin / auth (starter kit defaults — kept for later)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
});

Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::resource('programs', ProgramController::class)->except('show');
    Route::resource('articles', ArticleController::class)->except('show');
    Route::resource('gallery', GalleryAlbumController::class);
    Route::post('gallery/{album}/photos', [GalleryPhotoController::class, 'store'])->name('gallery.photos.store');
    Route::delete('gallery/{album}/photos/{photo}', [GalleryPhotoController::class, 'destroy'])->name('gallery.photos.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
