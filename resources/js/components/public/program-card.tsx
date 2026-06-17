import { type Program } from '@/lib/mock-data';
import { Link } from '@inertiajs/react';
import { ArrowRight, CalendarClock } from 'lucide-react';

export function ProgramCard({ program }: { program: Program }) {
    return (
        <Link
            href={`/program/${program.slug}`}
            className="group flex h-full flex-col border border-stone-200 bg-white p-4 transition-all duration-300 hover:border-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A98446]"
        >
            <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-stone-100">
                <img
                    src={program.image}
                    alt={program.title}
                    loading="lazy"
                    className="size-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                />
            </div>
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-[#A98446]">{program.category}</span>
            <h3 className="mb-3 font-serif text-lg font-medium text-[#0F1A13] transition-colors group-hover:text-[#1F3A2B]">{program.title}</h3>
            <p className="line-clamp-2 text-xs leading-relaxed text-stone-500">{program.excerpt}</p>
            <div className="mt-4 flex items-center gap-2 border-t border-stone-100 pt-4 text-[11px] text-stone-500">
                <CalendarClock className="size-3.5 text-[#A98446]" />
                {program.schedule}
            </div>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F3A2B]">
                Selengkapnya
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </span>
        </Link>
    );
}
