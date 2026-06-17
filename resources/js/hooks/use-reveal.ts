import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element once it scrolls into view (fade/slide-up).
 * Falls back to "visible" immediately when IntersectionObserver is
 * unavailable or the user prefers reduced motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
    const ref = useRef<T>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, ...options },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [options]);

    return { ref, visible };
}
