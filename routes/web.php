<?php

use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\GalleryAlbumController;
use App\Http\Controllers\Admin\GalleryPhotoController;
use App\Http\Controllers\Admin\ProgramController as AdminProgramController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Public\ArticleController;
use App\Http\Controllers\Public\GalleryController;
use App\Http\Controllers\Public\ProgramController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ── Public ───────────────────────────────────────────────────────────────────

Route::get('/', WelcomeController::class)->name('home');
Route::get('/profil', fn () => Inertia::render('public/profil'))->name('profil');
Route::get('/kontak', fn () => Inertia::render('public/kontak'))->name('kontak');
Route::get('/donasi', fn () => Inertia::render('public/donasi/index'))->name('donasi.index');

Route::get('/program', [ProgramController::class, 'index'])->name('program.index');
Route::get('/program/{slug}', [ProgramController::class, 'show'])->name('program.show');

Route::get('/berita', [ArticleController::class, 'index'])->name('berita.index');
Route::get('/berita/{slug}', [ArticleController::class, 'show'])->name('berita.show');

Route::get('/galeri', [GalleryController::class, 'index'])->name('galeri');

// ── Auth ─────────────────────────────────────────────────────────────────────

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

// ── Admin CMS ────────────────────────────────────────────────────────────────

Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::resource('programs', AdminProgramController::class)->except('show');
    Route::resource('articles', AdminArticleController::class)->except('show');
    Route::resource('gallery', GalleryAlbumController::class);
    Route::post('gallery/{album}/photos', [GalleryPhotoController::class, 'store'])->name('gallery.photos.store');
    Route::delete('gallery/{album}/photos/{photo}', [GalleryPhotoController::class, 'destroy'])->name('gallery.photos.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
