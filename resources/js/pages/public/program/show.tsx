import { PageHero } from '@/components/public/page-hero';
import { ProgramCard } from '@/components/public/program-card';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import { programs, tenant } from '@/lib/mock-data';
import { Head, Link } from '@inertiajs/react';
import { CalendarClock, CheckCircle2, Heart, Tag } from 'lucide-react';

export default function ProgramShow({ slug }: { slug: string }) {
    const program = programs.find((p) => p.slug === slug) ?? programs[0];
    const related = programs.filter((p) => p.slug !== program.slug && p.category === program.category).slice(0, 3);

    return (
        <PublicLayout>
            <Head title={program.title} />
            <PageHero
                title={program.title}
                crumbs={[{ label: 'Beranda', href: '/' }, { label: 'Program', href: '/program' }, { label: program.title }]}
            />

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-10 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="border border-stone-200 bg-white p-3">
                            <img src={program.image} alt={program.title} className="aspect-[16/9] w-full object-cover grayscale" />
                        </div>
                        <div className="mt-8 max-w-none text-stone-600">
                            <p className="text-lg leading-relaxed">{program.excerpt}</p>
                            <p className="mt-4 leading-relaxed">
                                Program ini merupakan bagian dari ikhtiar {tenant.brandName} dalam mendidik dan membina umat. Dikelola
                                secara amanah oleh para pengajar yang berkompeten, dengan tujuan menghadirkan manfaat nyata dan
                                berkelanjutan bagi para peserta didik.
                            </p>
                            <h3 className="mt-8 font-serif text-xl font-light text-[#0F1A13]">Keunggulan Program</h3>
                            <ul className="mt-4 space-y-2.5">
                                {['Memadukan kurikulum nasional dengan nilai Islam', 'Lingkungan belajar yang Islami dan kondusif', 'Pembinaan karakter dan kedisiplinan', 'Pelaporan kegiatan yang transparan'].map(
                                    (b) => (
                                        <li key={b} className="flex gap-3 text-stone-600">
                                            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#1F3A2B]" /> {b}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-28 border border-stone-200 bg-white p-6">
                            <h3 className="font-serif text-lg font-light text-[#0F1A13]">Informasi Program</h3>
                            <dl className="mt-4 space-y-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <Tag className="mt-0.5 size-5 text-[#A98446]" />
                                    <div>
                                        <dt className="text-stone-500">Kategori</dt>
                                        <dd className="font-medium text-[#0F1A13]">{program.category}</dd>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CalendarClock className="mt-0.5 size-5 text-[#A98446]" />
                                    <div>
                                        <dt className="text-stone-500">Jadwal</dt>
                                        <dd className="font-medium text-[#0F1A13]">{program.schedule}</dd>
                                    </div>
                                </div>
                            </dl>
                            <Button asChild className="mt-6 w-full rounded-none bg-[#1F3A2B] text-[#FAF8F5] hover:bg-[#15281D]">
                                <Link href="/donasi">
                                    <Heart className="size-4" /> Dukung Program Ini
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="mt-3 w-full rounded-none border-stone-300">
                                <Link href="/kontak">Daftar / Tanya</Link>
                            </Button>
                        </div>
                    </aside>
                </div>

                {related.length > 0 && (
                    <div className="mt-20">
                        <h2 className="font-serif text-2xl font-light text-[#0F1A13]">Program Terkait</h2>
                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((p) => (
                                <ProgramCard key={p.slug} program={p} />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
