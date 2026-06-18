import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type Article, type BreadcrumbItem, type Program, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, BookOpen, FileText, FolderOpen, Images, LayoutDashboard, Plus } from 'lucide-react';

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

interface StatCardProps {
    label: string;
    value: number;
    sub: string;
    icon: React.ElementType;
    accent: string;
    href: string;
}

function StatCard({ label, value, sub, icon: Icon, accent, href }: StatCardProps) {
    return (
        <Link
            href={href}
            className="group relative overflow-hidden rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
        >
            <div
                className="pointer-events-none absolute right-0 top-0 size-24 opacity-[0.06] blur-2xl transition-opacity group-hover:opacity-[0.12]"
                style={{ backgroundColor: accent }}
            />
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
                    <p className="mt-2 text-4xl font-bold tracking-tight">{value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
                </div>
                <div className="rounded-lg p-2.5" style={{ backgroundColor: `${accent}18` }}>
                    <Icon className="h-5 w-5" style={{ color: accent }} />
                </div>
            </div>
            <div
                className="absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 group-hover:h-1"
                style={{ backgroundColor: accent }}
            />
        </Link>
    );
}

function formatDate(d: string | null) {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getGreeting() {
    const h = new Date().getHours();
    if (h < 11) return 'Selamat pagi';
    if (h < 15) return 'Selamat siang';
    if (h < 18) return 'Selamat sore';
    return 'Selamat malam';
}

export default function Dashboard({ stats, recent_articles, recent_programs }: Props) {
    const { auth } = usePage<SharedData>().props;
    const firstName = auth?.user?.name?.split(' ')[0] ?? 'Admin';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <LayoutDashboard className="size-4" />
                            <span className="text-xs font-medium uppercase tracking-wide">Panel Admin</span>
                        </div>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight">
                            {getGreeting()}, {firstName}!
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Kelola konten Yayasan Islam Al-Munawwar dari sini.
                        </p>
                    </div>
                    <div className="hidden shrink-0 items-center gap-2 sm:flex">
                        <Button asChild size="sm" className="bg-[#1F3A2B] text-white hover:bg-[#162d20]">
                            <Link href={route('admin.articles.create')}>
                                <Plus className="mr-1.5 size-3.5" />
                                Artikel Baru
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats grid */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        label="Program"
                        value={stats.programs}
                        sub={`${stats.programs_published} dari ${stats.programs} dipublikasi`}
                        icon={FolderOpen}
                        accent="#1F3A2B"
                        href={route('admin.programs.index')}
                    />
                    <StatCard
                        label="Artikel"
                        value={stats.articles}
                        sub={`${stats.articles_published} dari ${stats.articles} dipublikasi`}
                        icon={FileText}
                        accent="#A98446"
                        href={route('admin.articles.index')}
                    />
                    <StatCard
                        label="Album Galeri"
                        value={stats.albums}
                        sub="total album foto"
                        icon={Images}
                        accent="#2563EB"
                        href={route('admin.gallery.index')}
                    />
                    <StatCard
                        label="Total Foto"
                        value={stats.photos}
                        sub="di semua album"
                        icon={BookOpen}
                        accent="#7C3AED"
                        href={route('admin.gallery.index')}
                    />
                </div>

                {/* Quick actions */}
                <div className="rounded-xl border bg-card p-5 shadow-sm">
                    <h2 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Akses Cepat
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild size="sm" className="bg-[#1F3A2B] text-white hover:bg-[#162d20]">
                            <Link href={route('admin.programs.create')}>
                                <Plus className="mr-1.5 size-3.5" />
                                Tambah Program
                            </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                            <Link href={route('admin.articles.create')}>
                                <Plus className="mr-1.5 size-3.5" />
                                Tambah Artikel
                            </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                            <Link href={route('admin.gallery.create')}>
                                <Plus className="mr-1.5 size-3.5" />
                                Tambah Album
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Recent content */}
                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Recent articles */}
                    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                        <div className="flex items-center justify-between border-b px-5 py-4">
                            <div className="flex items-center gap-2">
                                <FileText className="size-4 text-[#A98446]" />
                                <h2 className="font-semibold">Artikel Terbaru</h2>
                            </div>
                            <Button asChild variant="ghost" size="sm" className="text-xs">
                                <Link href={route('admin.articles.index')} className="flex items-center gap-1">
                                    Semua artikel
                                    <ArrowRight className="size-3" />
                                </Link>
                            </Button>
                        </div>
                        {recent_articles.length === 0 ? (
                            <div className="px-5 py-10 text-center">
                                <FileText className="mx-auto size-8 text-muted-foreground/40" />
                                <p className="mt-2 text-sm text-muted-foreground">Belum ada artikel.</p>
                                <Button asChild size="sm" className="mt-3 bg-[#1F3A2B] text-white hover:bg-[#162d20]">
                                    <Link href={route('admin.articles.create')}>Buat sekarang</Link>
                                </Button>
                            </div>
                        ) : (
                            <ul className="divide-y">
                                {recent_articles.map((a) => (
                                    <li key={a.id} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-muted/40 transition-colors">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium">{a.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {a.category} &middot; {formatDate(a.published_at)}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={a.is_published ? 'default' : 'secondary'}
                                            className={`shrink-0 text-[10px] ${a.is_published ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : ''}`}
                                        >
                                            {a.is_published ? 'Publik' : 'Draft'}
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Recent programs */}
                    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                        <div className="flex items-center justify-between border-b px-5 py-4">
                            <div className="flex items-center gap-2">
                                <FolderOpen className="size-4 text-[#1F3A2B]" />
                                <h2 className="font-semibold">Program Terbaru</h2>
                            </div>
                            <Button asChild variant="ghost" size="sm" className="text-xs">
                                <Link href={route('admin.programs.index')} className="flex items-center gap-1">
                                    Semua program
                                    <ArrowRight className="size-3" />
                                </Link>
                            </Button>
                        </div>
                        {recent_programs.length === 0 ? (
                            <div className="px-5 py-10 text-center">
                                <FolderOpen className="mx-auto size-8 text-muted-foreground/40" />
                                <p className="mt-2 text-sm text-muted-foreground">Belum ada program.</p>
                                <Button asChild size="sm" className="mt-3 bg-[#1F3A2B] text-white hover:bg-[#162d20]">
                                    <Link href={route('admin.programs.create')}>Buat sekarang</Link>
                                </Button>
                            </div>
                        ) : (
                            <ul className="divide-y">
                                {recent_programs.map((p) => (
                                    <li key={p.id} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-muted/40 transition-colors">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium">{p.title}</p>
                                            <p className="text-xs text-muted-foreground">{p.category}</p>
                                        </div>
                                        <Badge
                                            variant={p.is_published ? 'default' : 'secondary'}
                                            className={`shrink-0 text-[10px] ${p.is_published ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : ''}`}
                                        >
                                            {p.is_published ? 'Publik' : 'Draft'}
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
