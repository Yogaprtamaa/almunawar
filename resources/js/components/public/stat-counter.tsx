import { useCountUp } from '@/hooks/use-count-up';
import { useReveal } from '@/hooks/use-reveal';

interface StatCounterProps {
    /** Display value, may include grouping dots, e.g. "8.500". */
    value: string;
    suffix?: string;
    label: string;
}

/** Animated statistic that counts up the first time it enters the viewport. */
export function StatCounter({ value, suffix, label }: StatCounterProps) {
    const { ref, visible } = useReveal<HTMLDivElement>();
    const target = parseInt(value.replace(/\D/g, ''), 10) || 0;
    const count = useCountUp(target, visible);

    return (
        <div ref={ref} className="flex flex-col items-center py-2 text-center">
            <span className="font-display text-4xl font-bold text-primary tabular-nums">
                {count.toLocaleString('id-ID')}
                {suffix}
            </span>
            <span className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        </div>
    );
}
