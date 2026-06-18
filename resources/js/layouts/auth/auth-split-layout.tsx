import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

function OrnamentStar({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" className={className} fill="currentColor" aria-hidden="true">
            <path d="M20 0l2.9 8.9L31.8 3l-5.1 8.9L36 14.1l-9.4.9L28.1 24l-8.1-5-8.1 5 1.5-9.1-9.4-.9 9.3-2.2L8.2 3l8.9 5.9L20 0z" />
        </svg>
    );
}

export default function AuthSplitLayout({ children, title, description }: AuthLayoutProps) {
    const { tenant } = usePage<SharedData>().props;

    return (
        <div className="grid min-h-dvh lg:grid-cols-2">
            {/* ── LEFT PANEL ─────────────────────────────────────── */}
            <div className="relative hidden flex-col overflow-hidden bg-[#1F3A2B] p-12 text-white lg:flex">
                {/* Subtle geometric grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #fff 1px, transparent 1px),
                            linear-gradient(to bottom, #fff 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Gold top accent */}
                <div className="absolute left-0 top-0 h-1 w-full bg-[#A98446]" />

                {/* Corner ornaments */}
                <OrnamentStar className="absolute right-10 top-10 size-8 text-[#A98446]/20" />
                <OrnamentStar className="absolute bottom-10 left-10 size-6 text-[#A98446]/15" />

                {/* Back to site */}
                <Link
                    href={route('home')}
                    className="relative z-10 flex w-fit items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                    <svg viewBox="0 0 16 16" className="size-3.5 fill-current" aria-hidden="true">
                        <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>
                    Kembali ke situs
                </Link>

                {/* Center content */}
                <div className="relative z-10 my-auto">
                    {/* Arabic bismillah-style ornament */}
                    <div className="mb-8 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#A98446]/30" />
                        <OrnamentStar className="size-5 text-[#A98446]" />
                        <div className="h-px flex-1 bg-[#A98446]/30" />
                    </div>

                    {/* Branding */}
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-md bg-[#A98446]/20 ring-1 ring-[#A98446]/40">
                            <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-[#A98446] stroke-[1.5]" aria-hidden="true">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A98446]">
                            Panel Admin
                        </span>
                    </div>

                    <h1 className="font-serif text-4xl font-light leading-snug text-white">
                        {tenant?.brandName ?? 'Yayasan Islam Al-Munawwar'}
                    </h1>

                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                        {tenant?.tagline ?? 'Pendidikan Berkarakter, Prestasi Unggul'}
                    </p>

                    {/* Divider */}
                    <div className="mt-8 flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10" />
                        <OrnamentStar className="size-3 text-white/20" />
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* Arabic verse */}
                    <p dir="rtl" lang="ar" className="mt-8 font-arabic text-xl leading-loose text-[#A98446]/80">
                        وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
                    </p>
                    <p className="mt-2 text-xs italic text-white/40">
                        "Barangsiapa bertakwa kepada Allah, niscaya Dia akan membukakan jalan keluar baginya."
                    </p>
                    <p className="mt-1 text-[10px] text-white/30">QS. At-Thalaq: 2</p>
                </div>

                {/* Footer */}
                <p className="relative z-10 text-xs text-white/30">
                    &copy; {new Date().getFullYear()} {tenant?.brandName ?? 'Al-Munawwar'}. Hak cipta dilindungi.
                </p>
            </div>

            {/* ── RIGHT PANEL (form) ──────────────────────────────── */}
            <div className="flex items-center justify-center bg-background px-6 py-12">
                <div className="w-full max-w-sm">
                    {/* Mobile logo */}
                    <Link href={route('home')} className="mb-8 flex items-center gap-3 lg:hidden">
                        <div className="flex size-9 items-center justify-center rounded-md bg-[#1F3A2B]">
                            <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-[#A98446] stroke-[1.5]" aria-hidden="true">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="font-semibold text-[#1F3A2B]">Al-Munawwar</span>
                    </Link>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
