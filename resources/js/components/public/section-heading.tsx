import { cn } from '@/lib/utils';

interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: 'center' | 'left';
    className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className }: SectionHeadingProps) {
    return (
        <div className={cn('flex flex-col gap-3', align === 'center' ? 'items-center text-center' : 'items-start text-left', className)}>
            {eyebrow && (
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A98446]">{eyebrow}</span>
            )}
            <h2 className="font-serif text-3xl font-light tracking-tight text-[#0F1A13] sm:text-4xl">{title}</h2>
            {description && <p className={cn('max-w-2xl text-pretty leading-relaxed text-stone-600', align === 'center' && 'mx-auto')}>{description}</p>}
        </div>
    );
}
