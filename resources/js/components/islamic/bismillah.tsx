import { cn } from '@/lib/utils';

interface BismillahProps {
    className?: string;
    /** Show the latin transliteration line below the calligraphy. */
    withTransliteration?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
    sm: 'text-2xl sm:text-3xl',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-4xl sm:text-5xl md:text-6xl',
};

/**
 * بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ — rendered in the Amiri Quran calligraphic
 * typeface with a pair of gold flourishes framing the script.
 */
export function Bismillah({ className, withTransliteration = false, size = 'md' }: BismillahProps) {
    return (
        <div className={cn('flex flex-col items-center gap-2 text-center', className)}>
            <div className="flex items-center gap-3 text-gold sm:gap-4">
                <Flourish className="hidden h-3 w-16 sm:block" />
                <p
                    dir="rtl"
                    lang="ar"
                    className={cn('font-arabic leading-none text-gold-gradient', sizeMap[size])}
                    aria-label="Bismillahir-rahmanir-rahim"
                >
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </p>
                <Flourish className="hidden h-3 w-16 -scale-x-100 sm:block" />
            </div>
            {withTransliteration && (
                <p className="text-xs tracking-wide text-muted-foreground sm:text-sm">
                    Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang
                </p>
            )}
        </div>
    );
}

function Flourish({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 64 12" fill="none" aria-hidden="true">
            <path d="M0 6h40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M40 6c4-4 8-4 12 0-4 4-8 4-12 0z" fill="currentColor" />
            <circle cx="58" cy="6" r="3" fill="currentColor" />
        </svg>
    );
}
