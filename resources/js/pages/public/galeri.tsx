import { PageHero } from '@/components/public/page-hero';
import { cn } from '@/lib/utils';
import PublicLayout from '@/layouts/public-layout';
import { albums } from '@/lib/mock-data';
import { Head } from '@inertiajs/react';
import { Images, Play } from 'lucide-react';
import { useState } from 'react';

export default function Galeri() {
    const [filter, setFilter] = useState<'Foto' | 'Video'>('Foto');

    return (
        <PublicLayout>
            <Head title="Galeri" />
            <PageHero
                title="Galeri"
                description="Dokumentasi kegiatan dan momen kebersamaan keluarga besar yayasan."
                crumbs={[{ label: 'Beranda', href: '/' }, { label: 'Galeri' }]}
            />

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="flex gap-2">
                    {(['Foto', 'Video'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            aria-pressed={filter === f}
                            className={cn(
                                'inline-flex cursor-pointer items-center gap-2 border px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A98446]',
                                filter === f
                                    ? 'border-[#1F3A2B] bg-[#1F3A2B] text-[#FAF8F5]'
                                    : 'border-stone-200 bg-transparent text-stone-600 hover:border-stone-400',
                            )}
                        >
                            {f === 'Foto' ? <Images className="size-4" /> : <Play className="size-4" />} {f}
                        </button>
                    ))}
                </div>

                {filter === 'Foto' ? (
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {albums.map((album) => (
                            <button
                                key={album.slug}
                                className="group relative aspect-[4/3] cursor-pointer overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A98446]"
                            >
                                <img
                                    src={album.cover}
                                    alt={album.title}
                                    loading="lazy"
                                    className="size-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                />
                                <span className="absolute inset-0 bg-gradient-to-t from-[#0F1A13]/90 via-[#0F1A13]/20 to-transparent" />
                                <span className="absolute inset-x-0 bottom-0 p-5 text-[#FAF8F5]">
                                    <span className="block font-serif text-lg font-medium">{album.title}</span>
                                    <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-[#FAF8F5]/80">
                                        <Images className="size-3.5" /> {album.count} foto
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {albums.slice(0, 3).map((album) => (
                            <div key={album.slug} className="overflow-hidden border border-stone-200 bg-white">
                                <div className="relative aspect-video">
                                    <img src={album.cover} alt={album.title} loading="lazy" className="size-full object-cover grayscale" />
                                    <span className="absolute inset-0 flex items-center justify-center bg-[#0F1A13]/40">
                                        <span className="flex size-14 items-center justify-center rounded-full bg-[#A98446] text-white shadow-lg">
                                            <Play className="size-6 translate-x-0.5" />
                                        </span>
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-serif font-medium text-[#0F1A13]">{album.title}</h3>
                                    <p className="mt-1 text-xs text-stone-500">Video · YouTube</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
