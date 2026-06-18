import { PageHero } from '@/components/public/page-hero';
import { cn, storageUrl } from '@/lib/utils';
import PublicLayout from '@/layouts/public-layout';
import { type GalleryAlbum } from '@/types';
import { Head } from '@inertiajs/react';
import { Images, Play } from 'lucide-react';
import { useState } from 'react';

export default function Galeri({ albums }: { albums: GalleryAlbum[] }) {
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
                    albums.length === 0 ? (
                        <p className="mt-16 text-center text-muted-foreground">Belum ada album foto.</p>
                    ) : (
                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {albums.map((album) => {
                                const cover = storageUrl(album.cover_image);
                                return (
                                    <div
                                        key={album.slug}
                                        className="group relative aspect-[4/3] cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A98446]"
                                    >
                                        {cover ? (
                                            <img
                                                src={cover}
                                                alt={album.title}
                                                loading="lazy"
                                                className="size-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                            />
                                        ) : (
                                            <div className="size-full bg-gradient-to-br from-[#1F3A2B]/20 to-[#A98446]/10" />
                                        )}
                                        <span className="absolute inset-0 bg-gradient-to-t from-[#0F1A13]/90 via-[#0F1A13]/20 to-transparent" />
                                        <span className="absolute inset-x-0 bottom-0 p-5 text-[#FAF8F5]">
                                            <span className="block font-serif text-lg font-medium">{album.title}</span>
                                            <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-[#FAF8F5]/80">
                                                <Images className="size-3.5" /> {album.photos_count ?? 0} foto
                                            </span>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )
                ) : (
                    <div className="mt-16 text-center text-muted-foreground">
                        <p>Konten video belum tersedia.</p>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
