import { cn } from '@/lib/utils';

interface ArabicVerseProps {
    /** The Arabic text (RTL). */
    arabic: string;
    /** Indonesian translation shown beneath. */
    translation?: string;
    /** Source reference, e.g. "QS. Al-Baqarah: 261". */
    source?: string;
    className?: string;
}

/** Renders a Qur'anic verse / hadith in calligraphic Arabic with a translation. */
export function ArabicVerse({ arabic, translation, source, className }: ArabicVerseProps) {
    return (
        <figure className={cn('flex flex-col items-center gap-4 text-center', className)}>
            <p dir="rtl" lang="ar" className="font-arabic text-2xl leading-[2.4] text-primary sm:text-3xl">
                {arabic}
            </p>
            {translation && (
                <blockquote className="max-w-2xl text-balance text-sm italic text-muted-foreground sm:text-base">
                    “{translation}”
                </blockquote>
            )}
            {source && <figcaption className="text-xs font-semibold uppercase tracking-widest text-gold">{source}</figcaption>}
        </figure>
    );
}
