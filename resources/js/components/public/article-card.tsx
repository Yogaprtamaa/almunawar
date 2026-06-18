import { formatDate, storageUrl } from '@/lib/utils';
import { type Article } from '@/types';
import { Link } from '@inertiajs/react';
import { CalendarDays } from 'lucide-react';

export function ArticleCard({ article }: { article: Article }) {
    const image = storageUrl(article.image);

    return (
        <Link
            href={`/berita/${article.slug}`}
            className="group flex flex-col border border-stone-200 bg-white transition-all duration-300 hover:border-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A98446]"
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                {image ? (
                    <img
                        src={image}
                        alt={article.title}
                        loading="lazy"
                        className="size-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                    />
                ) : (
                    <div className="size-full bg-gradient-to-br from-stone-200 to-stone-100" />
                )}
                <span className="absolute left-0 top-4 bg-[#1F3A2B] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#FAF8F5]">
                    {article.category}
                </span>
            </div>
            <div className="flex flex-1 flex-col gap-2.5 p-5">
                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                    <CalendarDays className="size-3.5" />
                    {formatDate(article.published_at)}
                </div>
                <h3 className="line-clamp-2 font-serif text-base font-medium leading-snug text-[#0F1A13] transition-colors group-hover:text-[#1F3A2B]">
                    {article.title}
                </h3>
                <p className="line-clamp-2 text-sm text-stone-500">{article.excerpt}</p>
            </div>
        </Link>
    );
}
