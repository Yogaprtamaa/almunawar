import { BrandMark } from '@/components/islamic/brand-mark';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { tenant } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { Heart, Mail, MapPin, Menu, Phone } from 'lucide-react';
import { useEffect, useState, type PropsWithChildren } from 'react';

interface NavLink {
    label: string;
    href: string;
}

const navLinks: NavLink[] = [
    { label: 'Beranda', href: '/' },
    { label: 'Profil', href: '/profil' },
    { label: 'Program', href: '/program' },
    { label: 'Berita', href: '/berita' },
    { label: 'Galeri', href: '/galeri' },
    { label: 'Kontak', href: '/kontak' },
];

export default function PublicLayout({ children }: PropsWithChildren) {
    const { url } = usePage();
    const isActive = (href: string) => (href === '/' ? url === '/' : url.startsWith(href));
    const isHome = url === '/';

    return (
        <div className="flex min-h-dvh scroll-smooth flex-col bg-[#FAF8F5] font-sans text-[#1E2E24] antialiased">
            <FloatingNav isActive={isActive} />
            {/* Home owns its full-bleed hero; other pages get clearance for the floating nav. */}
            <main className={cn('flex-1', !isHome && 'pt-28')}>{children}</main>
            <SiteFooter />
        </div>
    );
}

function FloatingNav({ isActive }: { isActive: (href: string) => boolean }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
            <nav
                className={cn(
                    'pointer-events-auto flex w-full max-w-4xl items-center justify-between gap-2 rounded-full px-3 py-2 transition-all duration-500 ease-out',
                    scrolled
                        ? 'border border-stone-200/80 bg-[#FAF8F5]/85 shadow-[0_10px_40px_-12px_rgba(15,26,19,0.25)] backdrop-blur-md'
                        : 'border border-transparent bg-[#FAF8F5]/40 backdrop-blur-sm',
                )}
            >
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2.5 pl-2">
                    <BrandMark className="size-8 shrink-0" />
                    <span className="font-display text-base font-bold tracking-tight text-[#1F3A2B]">{tenant.brandShort}</span>
                </Link>

                {/* Center links */}
                <div className="hidden items-center gap-1 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                                isActive(link.href) ? 'text-[#A98446]' : 'text-[#1F3A2B]/70 hover:text-[#1F3A2B]',
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA + mobile */}
                <div className="flex items-center gap-1.5">
                    <Button
                        asChild
                        className="hidden rounded-full bg-[#1F3A2B] px-5 text-[#FAF8F5] shadow-none transition-colors hover:bg-[#15281D] sm:inline-flex"
                    >
                        <Link href="/donasi">
                            <Heart className="size-4" /> Donasi
                        </Link>
                    </Button>
                    <MobileMenu isActive={isActive} />
                </div>
            </nav>
        </header>
    );
}

function MobileMenu({ isActive }: { isActive: (href: string) => boolean }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-[#1F3A2B] hover:bg-[#1F3A2B]/5 lg:hidden" aria-label="Buka menu navigasi">
                    <Menu className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-stone-200 bg-[#FAF8F5]">
                <SheetTitle className="sr-only">Menu navigasi</SheetTitle>
                <div className="mt-6 flex items-center gap-3">
                    <BrandMark className="size-9" />
                    <span className="font-display text-base font-bold text-[#1F3A2B]">{tenant.brandName}</span>
                </div>
                <nav className="mt-8 flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[#1F3A2B]/5',
                                isActive(link.href) ? 'bg-[#1F3A2B]/5 text-[#A98446]' : 'text-[#1F3A2B]/80',
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <Button asChild className="mt-6 w-full rounded-full bg-[#1F3A2B] text-[#FAF8F5] hover:bg-[#15281D]">
                    <Link href="/donasi">
                        <Heart className="size-4" /> Donasi Sekarang
                    </Link>
                </Button>
            </SheetContent>
        </Sheet>
    );
}

function SiteFooter() {
    return (
        <footer className="bg-[#15281D] text-[#FAF8F5]/75">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
                <div className="sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center gap-3">
                        <BrandMark className="size-10" />
                        <span className="font-display text-lg font-bold text-[#FAF8F5]">{tenant.brandName}</span>
                    </div>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed">
                        {tenant.tagline}. Bersama membangun generasi Qur’ani yang berakhlak mulia.
                    </p>
                    <p dir="rtl" className="mt-5 font-arabic text-xl text-[#A98446]">رَبَّنَا تَقَبَّلْ مِنَّا</p>
                </div>

                <FooterCol title="Navigasi" links={navLinks} />

                <FooterCol
                    title="Unit & Program"
                    links={[
                        { label: 'KB–TK Islam', href: '/program/kb-tk-islam-al-munawwar' },
                        { label: 'SDIT Al-Munawwar', href: '/program/sdit-al-munawwar' },
                        { label: 'Panti Asuhan', href: '/program/panti-asuhan-al-munawwar' },
                        { label: 'Masjid Al-Munawwar', href: '/program/masjid-al-munawwar' },
                    ]}
                />

                <div>
                    <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#A98446]">Kontak</h4>
                    <ul className="mt-5 space-y-3 text-sm">
                        <li className="flex gap-2.5">
                            <MapPin className="mt-0.5 size-4 shrink-0 text-[#A98446]" /> {tenant.address}
                        </li>
                        <li className="flex gap-2.5">
                            <Phone className="mt-0.5 size-4 shrink-0 text-[#A98446]" /> {tenant.phone}
                        </li>
                        <li className="flex gap-2.5">
                            <Mail className="mt-0.5 size-4 shrink-0 text-[#A98446]" /> {tenant.email}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-[#FAF8F5]/55 sm:flex-row">
                    <p>© {new Date().getFullYear()} {tenant.brandName}. Hak cipta dilindungi.</p>
                    <p className="font-arabic text-sm text-[#A98446]">وَاللهُ أَعْلَم</p>
                </div>
            </div>
        </footer>
    );
}

function FooterCol({ title, links }: { title: string; links: NavLink[] }) {
    return (
        <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#A98446]">{title}</h4>
            <ul className="mt-5 space-y-2.5 text-sm">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="transition-colors hover:text-[#FAF8F5]">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
