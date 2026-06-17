import { cn } from '@/lib/utils';

/**
 * A horizontal rule with a central 8-point Islamic star (khatam) in gold.
 * Used to separate page sections in keeping with the religious motif.
 */
export function OrnamentDivider({ className }: { className?: string }) {
    return (
        <div className={cn('flex items-center justify-center gap-4 text-gold', className)} aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50 sm:w-28" />
            <EightPointStar className="h-5 w-5" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
            <EightPointStar className="h-7 w-7" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
            <EightPointStar className="h-5 w-5" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50 sm:w-28" />
        </div>
    );
}

export function EightPointStar({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 1.5l2.6 4.3 4.9.7-3.3 3.6 1.1 4.9L12 17.4l-5.3 2.6 1.1-4.9-3.3-3.6 4.9-.7z"
                className="opacity-0"
            />
            <path
                d="M12 2l2.1 3.6 4 .6L12 2zM12 2l-2.1 3.6-4 .6L12 2z"
                className="opacity-0"
            />
            {/* two overlaid squares = 8-point star */}
            <rect x="5" y="5" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect
                x="5"
                y="5"
                width="14"
                height="14"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
                transform="rotate(45 12 12)"
            />
        </svg>
    );
}
