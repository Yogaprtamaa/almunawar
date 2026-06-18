import { ArticleCard } from '@/components/public/article-card';
import { PageHero } from '@/components/public/page-hero';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import PublicLayout from '@/layouts/public-layout';
import { type Article } from '@/types';
import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function BeritaIndex({ articles }: { articles: Article[] }) {
    const categories = useMemo(
        () => ['Semua', ...Array.from(new Set(articles.map((a) => a.category)))],
        [articles],
    );
    const [active, setActive] = useState('Semua');
    const [query, setQuery] = useState('');

    const filtered = articles.filter((a) => {
        const matchCat = active === 'Semua' || a.category === active;
        const matchQuery = a.title.toLowerCase().includes(query.toLowerCase());
        return matchCat && matchQuery;
    });

    return (
        <PublicLayout>
            <Head title="Berita" />
            <PageHero
                title="Berita & Kegiatan"
                description="Kabar terbaru seputar kegiatan, program, dan perkembangan yayasan."
                crumbs={[{ label: 'Beranda', href: '/' }, { label: 'Berita' }]}
            />

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                aria-pressed={active === cat}
                                className={cn(
                                    'cursor-pointer border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A98446]',
                                    active === cat
                                        ? 'border-[#1F3A2B] bg-[#1F3A2B] text-[#FAF8F5]'
                                        : 'border-stone-200 bg-transparent text-stone-600 hover:border-stone-400',
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full sm:w-72">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari berita…"
                            aria-label="Cari berita"
                            className="pl-9"
                        />
                    </div>
                </div>

                {filtered.length > 0 ? (
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((article) => (
                            <ArticleCard key={article.slug} article={article} />
                        ))}
                    </div>
                ) : (
                    <p className="mt-16 text-center text-muted-foreground">
                        {articles.length === 0
                            ? 'Belum ada artikel yang dipublikasikan.'
                            : 'Tidak ada berita yang cocok dengan pencarian Anda.'}
                    </p>
                )}
            </section>
        </PublicLayout>
    );
}
