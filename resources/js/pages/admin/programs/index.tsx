import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Paginator, type Program, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Program', href: '/admin/programs' },
];

export default function ProgramIndex({ programs }: { programs: Paginator<Program> }) {
    const { flash } = usePage<SharedData>().props;

    const handleDelete = (id: number) => {
        if (!confirm('Yakin ingin menghapus program ini?')) return;
        router.delete(route('admin.programs.destroy', id), { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Program" />

            <div className="flex flex-col gap-4 p-4">
                {flash.success && (
                    <div className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Program</h1>
                    <Button asChild size="sm">
                        <Link href={route('admin.programs.create')}>
                            <Plus className="mr-1 h-4 w-4" />
                            Tambah Program
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
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programs.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                        Belum ada program.
                                    </td>
                                </tr>
                            )}
                            {programs.data.map((program, i) => (
                                <tr key={program.id} className="border-b last:border-0 hover:bg-muted/40">
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {(programs.current_page - 1) * programs.per_page + i + 1}
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="font-medium">{program.title}</p>
                                        <p className="text-xs text-muted-foreground">{program.slug}</p>
                                    </td>
                                    <td className="px-4 py-3">{program.category}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={program.is_published ? 'default' : 'secondary'}>
                                            {program.is_published ? 'Publish' : 'Draft'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={route('admin.programs.edit', program.id)}>
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(program.id)}
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

                {programs.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1">
                        {programs.links.map((link, i) => (
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
