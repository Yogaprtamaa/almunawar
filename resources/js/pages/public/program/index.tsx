import { PageHero } from '@/components/public/page-hero';
import { ProgramCard } from '@/components/public/program-card';
import { cn } from '@/lib/utils';
import PublicLayout from '@/layouts/public-layout';
import { type Program } from '@/types';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function ProgramIndex({ programs }: { programs: Program[] }) {
    const categories = useMemo(
        () => ['Semua', ...Array.from(new Set(programs.map((p) => p.category)))],
        [programs],
    );
    const [active, setActive] = useState('Semua');

    const filtered = active === 'Semua' ? programs : programs.filter((p) => p.category === active);

    return (
        <PublicLayout>
            <Head title="Program" />
            <PageHero
                title="Program & Kegiatan"
                description="Beragam program pendidikan, dakwah, sosial, dan wakaf untuk kemaslahatan umat."
                crumbs={[{ label: 'Beranda', href: '/' }, { label: 'Program' }]}
            />

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter kategori program">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            role="tab"
                            aria-selected={active === cat}
                            onClick={() => setActive(cat)}
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

                {filtered.length > 0 ? (
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((program) => (
                            <ProgramCard key={program.slug} program={program} />
                        ))}
                    </div>
                ) : (
                    <p className="mt-16 text-center text-muted-foreground">Belum ada program yang tersedia.</p>
                )}
            </section>
        </PublicLayout>
    );
}
