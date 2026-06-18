import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type GalleryAlbum, type Paginator, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Images, Pencil, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Galeri', href: '/admin/gallery' },
];

export default function GalleryIndex({ albums }: { albums: Paginator<GalleryAlbum> }) {
    const { flash } = usePage<SharedData>().props;

    const handleDelete = (id: number) => {
        if (!confirm('Yakin ingin menghapus album dan semua fotonya?')) return;
        router.delete(route('admin.gallery.destroy', id), { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galeri" />

            <div className="flex flex-col gap-4 p-4">
                {flash.success && (
                    <div className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Galeri</h1>
                    <Button asChild size="sm">
                        <Link href={route('admin.gallery.create')}>
                            <Plus className="mr-1 h-4 w-4" />
                            Tambah Album
                        </Link>
                    </Button>
                </div>

                {albums.data.length === 0 && (
                    <div className="rounded-xl border bg-card py-16 text-center text-muted-foreground">
                        Belum ada album galeri.
                    </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {albums.data.map((album) => (
                        <div key={album.id} className="overflow-hidden rounded-xl border bg-card">
                            <div className="relative aspect-video bg-muted">
                                {album.cover_image ? (
                                    <img
                                        src={`/storage/${album.cover_image}`}
                                        alt={album.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-muted-foreground">
                                        <Images className="h-10 w-10" />
                                    </div>
                                )}
                                <div className="absolute right-2 top-2">
                                    <Badge variant={album.is_published ? 'default' : 'secondary'}>
                                        {album.is_published ? 'Publish' : 'Draft'}
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-4">
                                <p className="font-medium">{album.title}</p>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    {album.photos_count ?? 0} foto
                                </p>

                                <div className="mt-3 flex gap-2">
                                    <Button asChild size="sm" variant="outline" className="flex-1">
                                        <Link href={route('admin.gallery.show', album.id)}>
                                            Kelola Foto
                                        </Link>
                                    </Button>
                                    <Button asChild size="sm" variant="outline">
                                        <Link href={route('admin.gallery.edit', album.id)}>
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Link>
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(album.id)}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {albums.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1">
                        {albums.links.map((link, i) => (
                            <Button
                                key={i}
                                size="sm"
                                variant={link.active ? 'default' : 'outline'}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
