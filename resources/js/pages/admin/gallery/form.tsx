import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type GalleryAlbum } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload } from 'lucide-react';
import { type FormEvent, useState } from 'react';

function toSlug(str: string) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export default function GalleryForm({ album }: { album?: GalleryAlbum }) {
    const isEdit = !!album;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Galeri', href: '/admin/gallery' },
        { title: isEdit ? 'Edit Album' : 'Tambah Album', href: '#' },
    ];

    const { data, setData, post, put, errors, processing } = useForm({
        title: album?.title ?? '',
        slug: album?.slug ?? '',
        description: album?.description ?? '',
        cover_image: null as File | null,
        is_published: album?.is_published ?? true,
    });

    const [preview, setPreview] = useState<string | null>(
        album?.cover_image ? `/storage/${album.cover_image}` : null,
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('cover_image', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setData((prev) => ({ ...prev, title, slug: toSlug(title) }));
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.gallery.update', album.id), { forceFormData: true });
        } else {
            post(route('admin.gallery.store'), { forceFormData: true });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Album' : 'Tambah Album'} />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-3">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('admin.gallery.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-xl font-semibold">{isEdit ? 'Edit Album' : 'Tambah Album'}</h1>
                </div>

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
                    <div className="flex flex-col gap-5 lg:col-span-2">
                        <div className="rounded-xl border bg-card p-5">
                            <div className="grid gap-4">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="title">Nama Album *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={handleTitleChange}
                                        placeholder="Nama album"
                                        required
                                    />
                                    <InputError message={errors.title} />
                                </div>

                                <div className="grid gap-1.5">
                                    <Label htmlFor="slug">Slug *</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="nama-album"
                                        required
                                    />
                                    <InputError message={errors.slug} />
                                </div>

                                <div className="grid gap-1.5">
                                    <Label htmlFor="description">Deskripsi</Label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        placeholder="Deskripsi singkat album..."
                                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    />
                                    <InputError message={errors.description} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="rounded-xl border bg-card p-5">
                            <h3 className="mb-4 font-medium">Publikasi</h3>
                            <label className="flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                    className="h-4 w-4 rounded border-input"
                                />
                                <span className="text-sm">Publish</span>
                            </label>
                        </div>

                        <div className="rounded-xl border bg-card p-5">
                            <h3 className="mb-4 font-medium">Cover Album</h3>
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="mb-3 aspect-video w-full rounded-lg object-cover"
                                />
                            )}
                            <label className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-input p-4 text-sm text-muted-foreground hover:border-primary hover:text-primary">
                                <Upload className="h-5 w-5" />
                                <span>{preview ? 'Ganti cover' : 'Upload cover'}</span>
                                <span className="text-xs">JPG, PNG, WebP · max 2MB</span>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                            <InputError message={errors.cover_image} />
                        </div>

                        <Button type="submit" disabled={processing} className="w-full">
                            {processing ? 'Menyimpan...' : isEdit ? 'Update Album' : 'Simpan Album'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
