import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type Article, type BreadcrumbItem, type Program } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileText, Images, Layers, TrendingUp } from 'lucide-react';

interface Stats {
    programs: number;
    programs_published: number;
    articles: number;
    articles_published: number;
    albums: number;
    photos: number;
}

interface Props {
    stats: Stats;
    recent_articles: Pick<Article, 'id' | 'title' | 'category' | 'is_published' | 'published_at'>[];
    recent_programs: Pick<Program, 'id' | 'title' | 'category' | 'is_published'>[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

function StatCard({
    label,
    value,
    sub,
    icon: Icon,
    color,
}: {
    label: string;
    value: number;
    sub: string;
    icon: React.ElementType;
    color: string;
}) {
    return (
        <div className="rounded-xl border bg-card p-5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="mt-1 text-3xl font-bold">{value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
                </div>
                <div className={`rounded-lg p-2 ${color}`}>
                    <Icon className="h-5 w-5 text-white" />
                </div>
            </div>
        </div>
    );
}

function formatDate(d: string | null) {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function Dashboard({ stats, recent_articles, recent_programs }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Selamat datang di panel admin Yayasan Islam Al-Munawwar.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        label="Program"
                        value={stats.programs}
                        sub={`${stats.programs_published} dipublikasikan`}
                        icon={Layers}
                        color="bg-blue-500"
                    />
                    <StatCard
                        label="Artikel"
                        value={stats.articles}
                        sub={`${stats.articles_published} dipublikasikan`}
                        icon={FileText}
                        color="bg-emerald-500"
                    />
                    <StatCard
                        label="Album Galeri"
                        value={stats.albums}
                        sub="total album"
                        icon={Images}
                        color="bg-violet-500"
                    />
                    <StatCard
                        label="Total Foto"
                        value={stats.photos}
                        sub="di semua album"
                        icon={TrendingUp}
                        color="bg-orange-500"
                    />
                </div>

                {/* Quick actions */}
                <div className="rounded-xl border bg-card p-5">
                    <h2 className="mb-4 font-semibold">Akses Cepat</h2>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild size="sm">
                            <Link href={route('admin.programs.create')}>+ Tambah Program</Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                            <Link href={route('admin.articles.create')}>+ Tambah Artikel</Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                            <Link href={route('admin.gallery.create')}>+ Tambah Album</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Recent articles */}
                    <div className="rounded-xl border bg-card">
                        <div className="flex items-center justify-between border-b px-5 py-4">
                            <h2 className="font-semibold">Artikel Terbaru</h2>
                            <Button asChild variant="ghost" size="sm">
                                <Link href={route('admin.articles.index')}>Lihat semua</Link>
                            </Button>
                        </div>
                        {recent_articles.length === 0 ? (
                            <p className="px-5 py-8 text-center text-sm text-muted-foreground">Belum ada artikel.</p>
                        ) : (
                            <ul className="divide-y">
                                {recent_articles.map((a) => (
                                    <li key={a.id} className="flex items-center justify-between px-5 py-3">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium">{a.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {a.category} · {formatDate(a.published_at)}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={a.is_published ? 'default' : 'secondary'}
                                            className="ml-3 shrink-0"
                                        >
                                            {a.is_published ? 'Publish' : 'Draft'}
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Recent programs */}
                    <div className="rounded-xl border bg-card">
                        <div className="flex items-center justify-between border-b px-5 py-4">
                            <h2 className="font-semibold">Program Terbaru</h2>
                            <Button asChild variant="ghost" size="sm">
                                <Link href={route('admin.programs.index')}>Lihat semua</Link>
                            </Button>
                        </div>
                        {recent_programs.length === 0 ? (
                            <p className="px-5 py-8 text-center text-sm text-muted-foreground">Belum ada program.</p>
                        ) : (
                            <ul className="divide-y">
                                {recent_programs.map((p) => (
                                    <li key={p.id} className="flex items-center justify-between px-5 py-3">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium">{p.title}</p>
                                            <p className="text-xs text-muted-foreground">{p.category}</p>
                                        </div>
                                        <Badge
                                            variant={p.is_published ? 'default' : 'secondary'}
                                            className="ml-3 shrink-0"
                                        >
                                            {p.is_published ? 'Publish' : 'Draft'}
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
