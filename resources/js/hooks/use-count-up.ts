import { useEffect, useState } from 'react';

/**
 * Eases a number from 0 → target (cubic-out) once `start` becomes true.
 * Respects reduced-motion by jumping straight to the target.
 */
export function useCountUp(target: number, start: boolean, duration = 1600) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setValue(target);
            return;
        }

        let raf = 0;
        const begin = performance.now();

        const tick = (now: number) => {
            const progress = Math.min((now - begin) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, start, duration]);

    return value;
}
