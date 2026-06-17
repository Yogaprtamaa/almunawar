import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/lib/utils';
import { type PropsWithChildren } from 'react';

interface RevealProps {
    className?: string;
    /** Stagger delay in milliseconds. */
    delay?: number;
}

/** Fades + slides its children up when they scroll into view. */
export function Reveal({ children, className, delay = 0 }: PropsWithChildren<RevealProps>) {
    const { ref, visible } = useReveal();

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={cn(
                'transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none',
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
                className,
            )}
        >
            {children}
        </div>
    );
}
