import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type Article, type BreadcrumbItem, type Paginator, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Artikel', href: '/admin/articles' },
];

function formatDate(dateStr: string | null) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric',
    });
}

export default function ArticleIndex({ articles }: { articles: Paginator<Article> }) {
    const { flash } = usePage<SharedData>().props;

    const handleDelete = (id: number) => {
        if (!confirm('Yakin ingin menghapus artikel ini?')) return;
        router.delete(route('admin.articles.destroy', id), { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Artikel" />

            <div className="flex flex-col gap-4 p-4">
                {flash.success && (
                    <div className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Artikel</h1>
                    <Button asChild size="sm">
                        <Link href={route('admin.articles.create')}>
                            <Plus className="mr-1 h-4 w-4" />
                            Tambah Artikel
                        </Link>
                    </Button>
                </div>

                <div className="rounded-xl border bg-card">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-left text-muted-foreground">
                                <th className="px-4 py-3 font-medium">No</th>
                                <th className="px-4 py-3 font-medium">Judul</th>
                                <th className="px-4 py-3 font-medium">Kategori</th>
                                <th className="px-4 py-3 font-medium">Penulis</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Tgl Publish</th>
                                <th className="px-4 py-3 font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                                        Belum ada artikel.
                                    </td>
                                </tr>
                            )}
                            {articles.data.map((article, i) => (
                                <tr key={article.id} className="border-b last:border-0 hover:bg-muted/40">
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {(articles.current_page - 1) * articles.per_page + i + 1}
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="font-medium">{article.title}</p>
                                        <p className="text-xs text-muted-foreground">{article.slug}</p>
                                    </td>
                                    <td className="px-4 py-3">{article.category}</td>
                                    <td className="px-4 py-3">{article.author}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={article.is_published ? 'default' : 'secondary'}>
                                            {article.is_published ? 'Publish' : 'Draft'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {formatDate(article.published_at)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={route('admin.articles.edit', article.id)}>
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(article.id)}
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {articles.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1">
                        {articles.links.map((link, i) => (
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
