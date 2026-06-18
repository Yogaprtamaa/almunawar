import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type GalleryAlbum, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Pencil, Trash2, Upload } from 'lucide-react';
import { type FormEvent, useRef, useState } from 'react';

export default function GalleryShow({ album }: { album: GalleryAlbum }) {
    const { flash } = usePage<SharedData>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Galeri', href: '/admin/gallery' },
        { title: album.title, href: '#' },
    ];

    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [captions, setCaptions] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(e.target.files ?? []);
        setFiles(selected);
        setPreviews(selected.map((f) => URL.createObjectURL(f)));
        setCaptions(selected.map(() => ''));
    };

    const handleUpload = (e: FormEvent) => {
        e.preventDefault();
        if (files.length === 0) return;

        const fd = new FormData();
        files.forEach((file, i) => {
            fd.append(`photos[${i}]`, file);
            if (captions[i]) fd.append(`captions[${i}]`, captions[i]);
        });

        setUploading(true);
        router.post(route('admin.gallery.photos.store', album.id), fd, {
            forceFormData: true,
            onSuccess: () => {
                setFiles([]);
                setPreviews([]);
                setCaptions([]);
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
            onFinish: () => setUploading(false),
        });
    };

    const handleDeletePhoto = (photoId: number) => {
        if (!confirm('Hapus foto ini?')) return;
        router.delete(route('admin.gallery.photos.destroy', { album: album.id, photo: photoId }), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={album.title} />

            <div className="flex flex-col gap-6 p-4">
                {flash.success && (
                    <div className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                {/* Album header */}
                <div className="flex items-center gap-3">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('admin.gallery.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-xl font-semibold">{album.title}</h1>
                        {album.description && (
                            <p className="text-sm text-muted-foreground">{album.description}</p>
                        )}
                    </div>
                    <Button asChild variant="outline" size="sm">
                        <Link href={route('admin.gallery.edit', album.id)}>
                            <Pencil className="mr-1 h-3.5 w-3.5" />
                            Edit Album
                        </Link>
                    </Button>
                </div>

                {/* Existing photos */}
                <div>
                    <h2 className="mb-3 font-medium">
                        Foto ({album.photos?.length ?? 0})
                    </h2>
                    {(!album.photos || album.photos.length === 0) ? (
                        <div className="rounded-xl border bg-card py-10 text-center text-sm text-muted-foreground">
                            Belum ada foto. Upload foto di bawah.
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {album.photos.map((photo) => (
                                <div key={photo.id} className="group relative overflow-hidden rounded-lg border bg-muted">
                                    <img
                                        src={`/storage/${photo.image_path}`}
                                        alt={photo.caption ?? ''}
                                        className="aspect-square h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDeletePhoto(photo.id)}
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                    {photo.caption && (
                                        <p className="truncate px-2 py-1 text-xs text-muted-foreground">
                                            {photo.caption}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Upload photos */}
                <div className="rounded-xl border bg-card p-5">
                    <h2 className="mb-4 font-medium">Upload Foto Baru</h2>
                    <form onSubmit={handleUpload} className="flex flex-col gap-4">
                        <label className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-input p-6 text-sm text-muted-foreground hover:border-primary hover:text-primary">
                            <Upload className="h-6 w-6" />
                            <span className="font-medium">Pilih foto (bisa lebih dari satu)</span>
                            <span className="text-xs">JPG, PNG, WebP · max 2MB per foto · max 20 foto</span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                multiple
                                className="hidden"
                                onChange={handleFilesChange}
                            />
                        </label>

                        {previews.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                                {previews.map((src, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <img
                                            src={src}
                                            alt=""
                                            className="aspect-square w-full rounded-lg object-cover"
                                        />
                                        <Input
                                            placeholder="Caption (opsional)"
                                            value={captions[i] ?? ''}
                                            onChange={(e) => {
                                                const next = [...captions];
                                                next[i] = e.target.value;
                                                setCaptions(next);
                                            }}
                                            className="h-7 text-xs"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {files.length > 0 && (
                            <Button type="submit" disabled={uploading} className="self-start">
                                {uploading ? 'Mengupload...' : `Upload ${files.length} Foto`}
                            </Button>
                        )}
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
