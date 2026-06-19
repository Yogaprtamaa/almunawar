import { EightPointStar } from '@/components/islamic/ornament-divider';
import { Carousel } from '@/components/public/carousel';
import { Reveal } from '@/components/public/reveal';
import { Button } from '@/components/ui/button';
import { useReveal } from '@/hooks/use-reveal';
import { formatRupiah, storageUrl } from '@/lib/utils';
import PublicLayout from '@/layouts/public-layout';
import { donationProgress, stats } from '@/lib/mock-data';
import { type Program, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, BookOpen, Clock, HandHeart, Heart, MapPin, Quote, ShieldCheck, Sparkles } from 'lucide-react';

const heroPortrait = 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=900&q=80';
const heroMosque = 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=700&q=80';
const ctaImage = 'https://images.unsplash.com/photo-1591902916744-91b0e1f0b5a4?w=900&q=80';

const prayerTimes = [
    { label: 'Subuh', time: '04:38' },
    { label: 'Dzuhur', time: '11:55' },
    { label: 'Ashar', time: '15:16' },
    { label: 'Maghrib', time: '17:50' },
    { label: 'Isya', time: '19:02' },
];

const avatars = [
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=80',
];

const values = [
    { icon: BookOpen, label: 'Ilmu & Prestasi', desc: 'Memadukan kurikulum nasional dengan nilai Islam — unggul akademik tanpa meninggalkan adab.' },
    { icon: Sparkles, label: 'Akhlak Mulia', desc: 'Menanamkan nilai moral, kedisiplinan, dan tanggung jawab dalam keseharian peserta didik.' },
    { icon: HandHeart, label: 'Kolaborasi & Kepedulian', desc: 'Merawat ukhuwah serta menjadi rumah kasih bagi anak yatim dan dhuafa.' },
    { icon: ShieldCheck, label: 'Amanah', desc: 'Pengelolaan lembaga yang transparan dan dapat dipertanggungjawabkan kepada umat.' },
];

const testimonials = [
    {
        quote: 'Melihat perkembangan akhlak dan prestasi anak kami di SDIT Al-Munawwar adalah berkah terbesar keluarga kami. Pembinaannya begitu tulus.',
        name: 'Ibu Hidayati',
        role: 'Wali Murid SDIT',
        image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=900&q=80',
    },
    {
        quote: 'Transparansi laporannya membuat hati tenang. Saya tahu pasti setiap donasi mengalir untuk anak-anak panti yang membutuhkan.',
        name: 'Bapak Ahmad Fauzi',
        role: 'Donatur Panti',
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=80',
    },
];

const fundedPercent = Math.round((donationProgress.raised / donationProgress.target) * 100);

export default function Beranda({ featuredPrograms }: { featuredPrograms: Program[] }) {
    const { tenant } = usePage<SharedData>().props;

    return (
        <PublicLayout>
            <Head title="Beranda - Rumah Generasi Qur'ani" />

            {/* ── CINEMATIC HERO ──────────────────────────────── */}
            <section className="relative min-h-screen flex items-center bg-[#FAF8F5] text-[#1E2E24] overflow-hidden">
                {/* Subtle Geometric Background */}
                <div className="absolute inset-0 opacity-[0.03] pattern-islamic pointer-events-none" />
                
                <div className="relative mx-auto max-w-7xl px-6 py-24 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    {/* Editorial Text Area */}
                    <Reveal className="lg:col-span-7 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-[#A98446] font-medium tracking-[0.2em] text-xs uppercase mb-6">
                            <EightPointStar className="size-4 animate-spin-slow" />
                            <span>Yayasan Pendidikan Islam</span>
                        </div>

                        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#0F1A13] leading-[1.05]">
                            Mendidik Generasi <br />
                            <span className="font-serif italic text-[#A98446] block mt-1">Berkarakter</span>
                            &amp; Berprestasi.
                        </h1>

                        <p className="mt-8 max-w-lg text-stone-600 font-sans text-base sm:text-lg leading-relaxed">
                            {tenant.brandName} memadukan kurikulum nasional dengan nilai-nilai Islam — membentuk peserta didik yang unggul dalam ilmu, berakhlak mulia, dan tangguh dalam karakter sejak usia dini.
                        </p>
                        
                        <div className="mt-10 flex flex-wrap gap-5">
                            <Button asChild size="lg" className="rounded-none bg-[#1F3A2B] hover:bg-[#15281D] text-[#FAF8F5] px-8 py-6 font-medium tracking-wide shadow-none transition-all duration-300">
                                <Link href="/donasi" className="flex items-center gap-3">
                                    Tunaikan Donasi <Heart className="size-4" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="ghost" className="rounded-none text-[#1F3A2B] hover:bg-[#1F3A2B]/5 px-6 font-medium tracking-wide transition-all duration-300">
                                <Link href="/program" className="flex items-center gap-2">
                                    Pelajari Program Kami <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>

                        {/* Minimalist Social Proof */}
                        <div className="mt-16 flex items-center gap-6 border-t border-stone-200 pt-8 max-w-md">
                            <div className="flex -space-x-2">
                                {avatars.map((src, i) => (
                                    <img key={i} src={src} alt="" className="size-9 rounded-full object-cover ring-2 ring-[#FAF8F5]" />
                                ))}
                            </div>
                            <div className="text-xs tracking-wide text-stone-500">
                                Bersama <span className="font-bold text-[#0F1A13]">{donationProgress.donorCount.toLocaleString('id-ID')}+</span> jiwa penyebar kebaikan yang terkoneksi.
                            </div>
                        </div>
                    </Reveal>

                    {/* Minimalist Asymmetric Image Collage */}
                    <Reveal delay={200} className="lg:col-span-5 relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-sm aspect-[3/4] overflow-hidden border border-stone-200 p-3 bg-white shadow-sm">
                            <img src={heroPortrait} alt="Santri" className="w-full h-full object-cover filter sepia-[10%] contrast-[95%]" />
                        </div>
                        <div className="absolute -left-10 bottom-10 hidden sm:block w-40 aspect-square overflow-hidden border border-stone-200 p-2 bg-white shadow-md transform -rotate-3">
                            <img src={heroMosque} alt="Masjid" className="w-full h-full object-cover" />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── MINIMALIST STATS STRIP ───────────────────────── */}
            <section className="bg-white border-y border-stone-200/80">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4 text-left divide-x-0 md:divide-x divide-stone-200">
                        {stats.map((s, index) => (
                            <div key={s.label} className={`flex flex-col ${index > 0 ? 'md:pl-8' : ''}`}>
                                <span className="font-serif text-4xl font-light text-[#A98446]">{s.value}{s.suffix}</span>
                                <span className="text-xs font-medium uppercase tracking-widest text-stone-500 mt-2">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CORE PHILOSOPHY (VALUES) ────────────────────── */}
            <section className="mx-auto max-w-7xl px-6 py-16 lg:py-36 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                <Reveal className="lg:col-span-5 lg:sticky lg:top-24">
                    <span className="text-[#A98446] text-xs font-semibold uppercase tracking-[0.2em] block mb-4">Prinsip Kami</span>
                    <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#0F1A13] tracking-tight leading-tight">
                        Mendidik dengan <br />Sepenuh Hati.
                    </h2>
                    <p className="mt-6 text-stone-600 leading-relaxed max-w-md">
                        Bukan sekadar mengejar nilai, kami membentuk karakter — menanamkan adab, kedisiplinan, dan kepedulian agar setiap anak unggul dalam prestasi maupun akhlak.
                    </p>
                    <div className="mt-8">
                        <Link href="/profil" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F3A2B] hover:text-[#A98446] transition-colors">
                            Baca Selengkapnya Tentang Manifestasi Kami <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </Reveal>

                <Reveal delay={150} className="lg:col-span-7 space-y-12">
                    {values.map((v, i) => (
                        <div key={v.label} className="group flex gap-6 items-start pb-8 border-b border-stone-100 last:border-0">
                            <span className="font-serif text-2xl font-light text-stone-300 group-hover:text-[#A98446] transition-colors duration-300">
                                0{i + 1}
                            </span>
                            <div className="space-y-2">
                                <h3 className="font-sans font-bold text-lg text-[#0F1A13]">{v.label}</h3>
                                <p className="text-sm text-stone-600 leading-relaxed">{v.desc}</p>
                            </div>
                        </div>
                    ))}
                </Reveal>
            </section>

            {/* ── EDITORIAL PROGRAM GALLERY ───────────────────── */}
            <section className="bg-[#FAF8F5] border-t border-stone-200/60 py-28">
                <div className="mx-auto max-w-7xl px-6">
                    <Reveal className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="text-[#A98446] text-xs font-semibold uppercase tracking-[0.2em] block mb-3">Ikhtiar Mulia</span>
                            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#0F1A13]">Pilar Program Utama</h2>
                        </div>
                        <Button asChild variant="link" className="text-[#1F3A2B] font-bold p-0 h-auto hover:text-[#A98446]">
                            <Link href="/program" className="flex items-center gap-2">Lihat Semua Program <ArrowRight className="size-4" /></Link>
                        </Button>
                    </Reveal>

                    <Reveal delay={100}>
                        <Carousel itemClassName="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4" autoPlayMs={6000}>
                            {featuredPrograms.map((program) => {
                                const img = storageUrl(program.image);
                                return (
                                    <div key={program.slug} className="h-full px-3">
                                        <Link href={`/program/${program.slug}`} className="group block bg-white border border-stone-200 p-4 h-full transition-all duration-300 hover:border-stone-400">
                                            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 mb-6">
                                                {img ? (
                                                    <img src={img} alt={program.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-[#1F3A2B]/10 to-[#A98446]/10" />
                                                )}
                                            </div>
                                            <span className="text-[10px] font-semibold tracking-widest text-[#A98446] uppercase block mb-2">{program.category}</span>
                                            <h3 className="font-serif text-lg font-medium text-[#0F1A13] mb-3 group-hover:text-[#1F3A2B] transition-colors">{program.title}</h3>
                                            <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{program.excerpt}</p>
                                        </Link>
                                    </div>
                                );
                            })}
                        </Carousel>
                    </Reveal>
                </div>
            </section>

            {/* ── MONOCHROME BENTO: JADWAL SHOLAT ──────────────── */}
            <section className="mx-auto max-w-7xl px-6 py-28">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Prayer Times Widget */}
                    <Reveal className="lg:col-span-7 bg-[#1F3A2B] text-[#FAF8F5] p-10 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.02] pattern-islamic pointer-events-none" />
                        
                        <div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                                <div className="flex items-center gap-3">
                                    <Clock className="size-4 text-[#A98446]" />
                                    <span className="font-serif tracking-wide text-lg">Panggilan Ibadah</span>
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-white/60 flex items-center gap-1">
                                    <MapPin className="size-3" /> {tenant.addressCity || 'Indonesia'}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                                {prayerTimes.map((p) => (
                                    <div key={p.label} className="border border-white/10 p-4 flex flex-col items-center justify-center bg-white/[0.02] transition-colors hover:bg-white/[0.05]">
                                        <span className="text-[10px] text-white/50 tracking-wider uppercase font-medium">{p.label}</span>
                                        <span className="font-sans text-xl font-light mt-2 tracking-tight text-white">{p.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 text-[11px] text-white/40 tracking-wide font-sans">
                            *Waktu sholat disesuaikan otomatis dengan zona waktu kota setempat.
                        </div>
                    </Reveal>

                    {/* Holy Reflection (Ayat) */}
                    <Reveal delay={150} className="lg:col-span-5 bg-white border border-stone-200 p-10 flex flex-col justify-between">
                        <div className="space-y-6">
                            <p dir="rtl" lang="ar" className="font-arabic text-2xl text-[#1F3A2B] leading-loose text-right">
                                شَهْرُ رَمَضَانَ الَّذِيٓ أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ
                            </p>
                            <p className="font-serif italic text-base text-stone-700 leading-relaxed">
                                “Bulan Ramadan adalah bulan diturunkannya Al-Qur’an sebagai petunjuk bagi umat manusia.”
                            </p>
                        </div>
                        <div className="border-t border-stone-100 pt-4 mt-8 flex justify-between items-center text-xs text-stone-400">
                            <span>QS. Al-Baqarah: 185</span>
                            <EightPointStar className="size-4 text-[#A98446]/40" />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── EDITORIAL TESTIMONIALS ──────────────────────── */}
            <section className="bg-white border-t border-stone-200 py-24">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <span className="text-[#A98446] text-xs font-semibold uppercase tracking-[0.2em] block mb-8">Dukungan &amp; Doa</span>
                    <Carousel itemClassName="basis-full" autoPlayMs={8000}>
                        {testimonials.map((t) => (
                            <div key={t.name} className="space-y-8 px-4">
                                <Quote className="size-8 mx-auto text-[#A98446]/30 stroke-[1px]" />
                                <p className="font-serif text-xl sm:text-2xl font-light text-[#0F1A13] leading-relaxed max-w-2xl mx-auto">
                                    “{t.quote}”
                                </p>
                                <div className="space-y-1">
                                    <p className="font-sans font-bold text-sm text-[#1F3A2B]">{t.name}</p>
                                    <p className="text-xs text-stone-400">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </section>

            {/* ── SOLEMN CTA SECTION ──────────────────────────── */}
            <section className="mx-auto max-w-7xl px-6 py-28">
                <Reveal className="border border-stone-200 bg-white p-8 sm:p-16 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-8">
                            <div>
                                <span className="text-[#A98446] text-xs font-semibold uppercase tracking-[0.2em] block mb-3">Amal Jariyah</span>
                                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#0F1A13]">Mari Berbagi Kebahagiaan</h2>
                                <p className="text-stone-500 text-sm mt-3 max-w-md leading-relaxed">
                                    Setiap kontribusi Anda membantu kelancaran operasional sekolah serta pendidikan dan pendampingan anak-anak Panti Al-Munawwar.
                                </p>
                            </div>

                            {/* Minimalist Progress Meter */}
                            <div className="space-y-3 max-w-lg bg-[#FAF8F5] p-6 border border-stone-200/60">
                                <div className="flex justify-between items-end text-xs">
                                    <div>
                                        <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Terkumpul</span>
                                        <span className="font-sans font-bold text-lg text-[#1F3A2B]">{formatRupiah(donationProgress.raised)}</span>
                                    </div>
                                    <span className="text-stone-500 font-medium">dari {formatRupiah(donationProgress.target)}</span>
                                </div>
                                <ProgressBar percent={fundedPercent} />
                                <div className="flex justify-between text-[11px] text-stone-400 font-medium pt-1">
                                    <span>Pencapaian: {fundedPercent}%</span>
                                    <span className="text-[#A98446]">{donationProgress.title}</span>
                                </div>
                            </div>

                            <Button asChild size="lg" className="rounded-none bg-[#1F3A2B] hover:bg-[#15281D] text-[#FAF8F5] px-8 py-6 font-medium shadow-none">
                                <Link href="/donasi" className="flex items-center gap-2">
                                    Mulai Berdonasi Sekarang <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>

                        {/* Monochrome Right Image Banner */}
                        <div className="lg:col-span-5 aspect-[4/3] sm:aspect-video lg:aspect-square overflow-hidden bg-stone-100 border border-stone-200 p-2">
                            <img src={ctaImage} alt="Santri membaca Quran" className="w-full h-full object-cover filter grayscale contrast-105" />
                        </div>
                    </div>
                </Reveal>
            </section>
        </PublicLayout>
    );
}

function ProgressBar({ percent }: { percent: number }) {
    const { ref, visible } = useReveal<HTMLDivElement>();
    return (
        <div ref={ref} className="h-[4px] w-full bg-stone-200 overflow-hidden">
            <div
                className="h-full bg-[#A98446] transition-[width] duration-1000 ease-out"
                style={{ width: visible ? `${Math.min(percent, 100)}%` : '0%' }}
            />
        </div>
    );
}