import { ArticleCard } from '@/components/public/article-card';
import { PageHero } from '@/components/public/page-hero';
import { Button } from '@/components/ui/button';
import { formatDate, storageUrl } from '@/lib/utils';
import PublicLayout from '@/layouts/public-layout';
import { type Article } from '@/types';
import { Head } from '@inertiajs/react';
import { CalendarDays, Facebook, Link2, Twitter, User } from 'lucide-react';

export default function BeritaShow({ article, related }: { article: Article; related: Article[] }) {
    const image = storageUrl(article.image);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    return (
        <PublicLayout>
            <Head title={article.title} />
            <PageHero
                title={article.title}
                crumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Berita', href: '/berita' },
                    { label: article.category },
                ]}
            />

            <article className="mx-auto max-w-3xl px-6 py-16">
                <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
                    <span className="bg-[#A98446]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#A98446]">
                        {article.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-4" /> {formatDate(article.published_at)}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <User className="size-4" /> {article.author}
                    </span>
                </div>

                <div className="mt-6 border border-stone-200 bg-white p-3">
                    {image ? (
                        <img
                            src={image}
                            alt={article.title}
                            className="aspect-[16/9] w-full object-cover grayscale"
                        />
                    ) : (
                        <div className="aspect-[16/9] w-full bg-gradient-to-br from-stone-200 to-stone-100" />
                    )}
                </div>

                <div className="mt-8 max-w-none leading-relaxed text-stone-700">
                    <p className="text-lg">{article.excerpt}</p>
                    {article.body ? (
                        <p className="mt-4 whitespace-pre-line">{article.body}</p>
                    ) : (
                        <>
                            <p className="mt-4">
                                Alhamdulillah, segala puji bagi Allah ﷻ atas terselenggaranya kegiatan ini. Acara
                                berlangsung dengan khidmat dan dihadiri oleh segenap keluarga besar yayasan, para wali
                                santri, serta masyarakat sekitar.
                            </p>
                            <p className="mt-4">
                                Kegiatan ini merupakan wujud nyata komitmen Yayasan Al-Munawwar dalam membina umat dan
                                menebar manfaat. Semoga Allah ﷻ senantiasa memberikan keberkahan dan kemudahan dalam
                                setiap langkah kebaikan.
                            </p>
                        </>
                    )}
                    <blockquote className="mt-6 border-l-2 border-[#A98446] bg-[#FAF8F5] p-4 font-arabic text-xl not-italic text-[#1F3A2B]">
                        وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًۭا
                    </blockquote>
                </div>

                <div className="mt-10 flex items-center gap-3 border-t border-stone-200 pt-6">
                    <span className="text-sm font-semibold text-[#0F1A13]">Bagikan:</span>
                    <Button variant="outline" size="icon" aria-label="Bagikan ke WhatsApp">
                        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                            <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.6.2-.2.3-.7.9-.8 1-.2.2-.3.2-.6 0-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 21.5a9.5 9.5 0 01-4.8-1.3l-.3-.2-3.5.9.9-3.4-.2-.4A9.5 9.5 0 1112 21.5m0-21A11.5 11.5 0 002 17.9L.5 23.5l5.8-1.5A11.5 11.5 0 1012 .5" />
                        </svg>
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Bagikan ke Facebook">
                        <Facebook className="size-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Bagikan ke Twitter">
                        <Twitter className="size-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Salin tautan" onClick={handleCopyLink}>
                        <Link2 className="size-4" />
                    </Button>
                </div>
            </article>

            {related.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 pb-16">
                    <h2 className="font-serif text-2xl font-light text-[#0F1A13]">Berita Terkait</h2>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((a) => (
                            <ArticleCard key={a.slug} article={a} />
                        ))}
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
