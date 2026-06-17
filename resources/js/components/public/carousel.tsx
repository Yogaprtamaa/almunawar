import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

interface CarouselProps {
    children: ReactNode;
    /** Tailwind basis classes per slide, e.g. "basis-full sm:basis-1/2 lg:basis-1/4". */
    itemClassName?: string;
    /** Autoplay interval in ms; omit to disable. */
    autoPlayMs?: number;
    className?: string;
    /** Hide the side navigation arrows. */
    hideArrows?: boolean;
}

/**
 * Dependency-free carousel built on native scroll-snap. Provides arrow
 * controls, paging dots, autoplay (paused on hover) and reduced-motion
 * support. Keyboard/touch scrolling works out of the box.
 */
export function Carousel({ children, itemClassName, autoPlayMs, className, hideArrows }: CarouselProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [pages, setPages] = useState(1);
    const [active, setActive] = useState(0);
    const slides = Children.toArray(children);

    const measure = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        const count = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
        setPages(count);
        setActive(Math.round(el.scrollLeft / el.clientWidth));
    }, []);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        measure();
        const onScroll = () => setActive(Math.round(el.scrollLeft / el.clientWidth));
        el.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', measure);
        return () => {
            el.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', measure);
        };
    }, [measure]);

    const scrollByPage = useCallback((dir: 1 | -1) => {
        const el = trackRef.current;
        if (!el) return;
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
        if (dir === 1 && atEnd) {
            el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {
        if (!autoPlayMs) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const el = trackRef.current;
        if (!el) return;

        let timer = window.setInterval(() => scrollByPage(1), autoPlayMs);
        const pause = () => window.clearInterval(timer);
        const resume = () => {
            pause();
            timer = window.setInterval(() => scrollByPage(1), autoPlayMs);
        };
        el.addEventListener('pointerenter', pause);
        el.addEventListener('pointerleave', resume);
        return () => {
            pause();
            el.removeEventListener('pointerenter', pause);
            el.removeEventListener('pointerleave', resume);
        };
    }, [autoPlayMs, scrollByPage]);

    return (
        <div className={cn('relative', className)}>
            <div
                ref={trackRef}
                className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {slides.map((child, i) => (
                    <div key={i} className={cn('shrink-0 snap-start', itemClassName)}>
                        {child}
                    </div>
                ))}
            </div>

            {!hideArrows && pages > 1 && (
                <>
                    <CarouselButton dir="prev" onClick={() => scrollByPage(-1)} />
                    <CarouselButton dir="next" onClick={() => scrollByPage(1)} />
                </>
            )}

            {pages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {Array.from({ length: pages }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Ke halaman ${i + 1}`}
                            onClick={() => trackRef.current?.scrollTo({ left: i * trackRef.current.clientWidth, behavior: 'smooth' })}
                            className={cn(
                                'h-2 rounded-full transition-all duration-300',
                                i === active ? 'w-6 bg-primary' : 'w-2 bg-primary/25 hover:bg-primary/50',
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function CarouselButton({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
    const Icon = dir === 'prev' ? ChevronLeft : ChevronRight;
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={dir === 'prev' ? 'Sebelumnya' : 'Berikutnya'}
            className={cn(
                'absolute top-[38%] z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-primary shadow-lg backdrop-blur transition hover:bg-card hover:shadow-xl md:flex',
                dir === 'prev' ? '-left-5' : '-right-5',
            )}
        >
            <Icon className="size-5" />
        </button>
    );
}
