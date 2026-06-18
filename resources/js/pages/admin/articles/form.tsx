import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type Article, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload } from 'lucide-react';
import { type FormEvent, useState } from 'react';

const CATEGORIES = ['Pengumuman', 'Kegiatan', 'Prestasi', 'Berita'];

function toSlug(str: string) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export default function ArticleForm({ article }: { article?: Article }) {
    const isEdit = !!article;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Artikel', href: '/admin/articles' },
        { title: isEdit ? 'Edit Artikel' : 'Tambah Artikel', href: '#' },
    ];

    const { data, setData, post, put, errors, processing } = useForm({
        title: article?.title ?? '',
        slug: article?.slug ?? '',
        category: article?.category ?? CATEGORIES[0],
        author: article?.author ?? '',
        excerpt: article?.excerpt ?? '',
        body: article?.body ?? '',
        image: null as File | null,
        is_published: article?.is_published ?? false,
        published_at: article?.published_at
            ? new Date(article.published_at).toISOString().slice(0, 16)
            : '',
    });

    const [preview, setPreview] = useState<string | null>(
        article?.image ? `/storage/${article.image}` : null,
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setData((prev) => ({ ...prev, title, slug: toSlug(title) }));
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.articles.update', article.id), { forceFormData: true });
        } else {
            post(route('admin.articles.store'), { forceFormData: true });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Artikel' : 'Tambah Artikel'} />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-3">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('admin.articles.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-xl font-semibold">{isEdit ? 'Edit Artikel' : 'Tambah Artikel'}</h1>
                </div>

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
                    <div className="flex flex-col gap-5 lg:col-span-2">
                        <div className="rounded-xl border bg-card p-5">
                            <div className="grid gap-4">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="title">Judul *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={handleTitleChange}
                                        placeholder="Judul artikel"
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
                                        placeholder="judul-artikel"
                                        required
                                    />
                                    <InputError message={errors.slug} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="category">Kategori *</Label>
                                        <select
                                            id="category"
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                            {CATEGORIES.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.category} />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="author">Penulis *</Label>
                                        <Input
                                            id="author"
                                            value={data.author}
                                            onChange={(e) => setData('author', e.target.value)}
                                            placeholder="Nama penulis"
                                            required
                                        />
                                        <InputError message={errors.author} />
                                    </div>
                                </div>

                                <div className="grid gap-1.5">
                                    <Label htmlFor="excerpt">Ringkasan *</Label>
                                    <textarea
                                        id="excerpt"
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                        rows={3}
                                        placeholder="Ringkasan singkat artikel..."
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        required
                                    />
                                    <InputError message={errors.excerpt} />
                                </div>

                                <div className="grid gap-1.5">
                                    <Label htmlFor="body">Konten</Label>
                                    <textarea
                                        id="body"
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        rows={10}
                                        placeholder="Isi artikel lengkap..."
                                        className="flex min-h-[240px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    />
                                    <InputError message={errors.body} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="rounded-xl border bg-card p-5">
                            <h3 className="mb-4 font-medium">Publikasi</h3>
                            <div className="grid gap-3">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                        className="h-4 w-4 rounded border-input"
                                    />
                                    <span className="text-sm">Publish</span>
                                </label>

                                <div className="grid gap-1.5">
                                    <Label htmlFor="published_at">Tanggal Publish</Label>
                                    <Input
                                        id="published_at"
                                        type="datetime-local"
                                        value={data.published_at}
                                        onChange={(e) => setData('published_at', e.target.value)}
                                    />
                                    <InputError message={errors.published_at} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card p-5">
                            <h3 className="mb-4 font-medium">Gambar</h3>
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="mb-3 aspect-video w-full rounded-lg object-cover"
                                />
                            )}
                            <label className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-input p-4 text-sm text-muted-foreground hover:border-primary hover:text-primary">
                                <Upload className="h-5 w-5" />
                                <span>{preview ? 'Ganti gambar' : 'Upload gambar'}</span>
                                <span className="text-xs">JPG, PNG, WebP · max 2MB</span>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                            <InputError message={errors.image} />
                        </div>

                        <Button type="submit" disabled={processing} className="w-full">
                            {processing ? 'Menyimpan...' : isEdit ? 'Update Artikel' : 'Simpan Artikel'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
