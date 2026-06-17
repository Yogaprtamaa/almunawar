import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
    label: string;
    href?: string;
}

export function PageHero({ title, description, crumbs }: { title: string; description?: string; crumbs: Crumb[] }) {
    return (
        <section className="relative overflow-hidden border-b border-stone-200 bg-[#FAF8F5]">
            <div className="pattern-islamic pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true" />
            <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
                <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs tracking-wide text-stone-500">
                    {crumbs.map((c, i) => (
                        <span key={c.label} className="flex items-center gap-1.5">
                            {c.href ? (
                                <Link href={c.href} className="transition-colors hover:text-[#A98446]">
                                    {c.label}
                                </Link>
                            ) : (
                                <span className="text-[#1F3A2B]">{c.label}</span>
                            )}
                            {i < crumbs.length - 1 && <ChevronRight className="size-3.5 text-stone-300" />}
                        </span>
                    ))}
                </nav>
                <h1 className="mt-4 font-serif text-4xl font-light tracking-tight text-[#0F1A13] sm:text-5xl">{title}</h1>
                {description && <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-stone-600">{description}</p>}
            </div>
        </section>
    );
}
