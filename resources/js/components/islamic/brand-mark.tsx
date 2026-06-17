import { cn } from '@/lib/utils';

/** Al-Munawar brand mark — a mosque dome crowned with a crescent & star, inside an arch. */
export function BrandMark({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <defs>
                <linearGradient id="bm-green" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="hsl(160 70% 34%)" />
                    <stop offset="1" stopColor="hsl(160 84% 20%)" />
                </linearGradient>
            </defs>
            {/* mihrab arch */}
            <path
                d="M24 3C13 3 6 11 6 24v18a3 3 0 003 3h30a3 3 0 003-3V24C42 11 35 3 24 3z"
                fill="url(#bm-green)"
            />
            {/* inner arch cutout */}
            <path
                d="M24 14c-5 0-9 4-9 11v20h18V25c0-7-4-11-9-11z"
                fill="hsl(150 40% 99%)"
                fillOpacity="0.95"
            />
            {/* crescent + star on top */}
            <path
                d="M24 3.2c-2.4 1-4 3.3-4 6 0 3.6 2.9 6.5 6.5 6.5.6 0 1.2-.1 1.7-.2-1 1.9-3 3.2-5.4 3.2A6.3 6.3 0 0124 3.2z"
                fill="hsl(38 78% 50%)"
            />
            {/* little door */}
            <rect x="21" y="33" width="6" height="12" rx="3" fill="url(#bm-green)" />
        </svg>
    );
}
