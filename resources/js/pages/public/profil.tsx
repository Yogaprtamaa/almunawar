import { PageHero } from '@/components/public/page-hero';
import { Reveal } from '@/components/public/reveal';
import { SectionHeading } from '@/components/public/section-heading';
import PublicLayout from '@/layouts/public-layout';
import { tenant } from '@/lib/mock-data';
import { Head } from '@inertiajs/react';
import { Award, BookOpen, Eye, HandHeart, Target, Users } from 'lucide-react';

const visiMisi = {
    visi: 'Menjadi lembaga pendidikan Islam yang melahirkan generasi berkarakter, berakhlak mulia, dan unggul dalam prestasi akademik maupun nonakademik.',
    misi: [
        'Memadukan kurikulum nasional dengan nilai-nilai Islam secara seimbang.',
        'Membentuk karakter, kedisiplinan, dan tanggung jawab sejak usia dini.',
        'Menumbuhkan kecintaan terhadap Al-Qur’an dan ibadah dalam keseharian.',
        'Merawat kepedulian sosial melalui pendidikan dan pengasuhan anak yatim & dhuafa.',
    ],
};

const struktur = [
    { name: 'KH. Abdullah Munawwar', role: 'Pembina Yayasan' },
    { name: 'H. Ahmad Syafi’i, M.Pd.', role: 'Ketua Yayasan' },
    { name: 'Ustadz Rahmat Hidayat, Lc.', role: 'Kepala Pendidikan' },
    { name: 'Hj. Fatimah Az-Zahra', role: 'Bendahara' },
];

const nilai = [
    { icon: HandHeart, title: 'Kolaborasi & Kepedulian', desc: 'Membangun kerja sama dan kepekaan sosial antar warga lembaga.' },
    { icon: BookOpen, title: 'Ilmu & Prestasi', desc: 'Mendorong semangat belajar dan pencapaian terbaik peserta didik.' },
    { icon: Award, title: 'Amanah', desc: 'Mengelola lembaga secara jujur, terbuka, dan bertanggung jawab.' },
    { icon: Users, title: 'Akhlak Mulia', desc: 'Menjadikan adab dan budi pekerti sebagai fondasi pendidikan.' },
];

export default function Profil() {
    return (
        <PublicLayout>
            <Head title="Profil Yayasan" />
            <PageHero
                title="Profil Yayasan"
                description={`Mengenal lebih dekat ${tenant.brandName} — sejarah, visi misi, dan nilai-nilai yang kami pegang.`}
                crumbs={[{ label: 'Beranda', href: '/' }, { label: 'Profil' }]}
            />

            {/* Tentang */}
            <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <Reveal className="border border-stone-200 bg-white p-3">
                        <img
                            src="https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=900&q=80"
                            alt="Kompleks Yayasan Al-Munawwar"
                            className="aspect-[4/3] w-full object-cover grayscale"
                        />
                    </Reveal>
                    <Reveal delay={120}>
                        <SectionHeading align="left" eyebrow="Tentang Kami" title="Memadukan Ilmu & Iman" />
                        <div className="mt-6 space-y-4 leading-relaxed text-stone-600">
                            <p>
                                {tenant.brandName} adalah lembaga pendidikan Islam di Tulungagung yang memadukan kurikulum nasional
                                dengan nilai-nilai Islam. Fokus kami bukan hanya kecerdasan akademik, tetapi juga pembentukan
                                karakter — menanamkan nilai moral, kedisiplinan, dan tanggung jawab.
                            </p>
                            <p>
                                Melalui unit KB–TK, SDIT, Panti Asuhan, dan Masjid Al-Munawwar, kami berikhtiar melahirkan generasi
                                yang unggul dalam prestasi sekaligus mulia dalam akhlak.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Visi Misi */}
            <section className="border-y border-stone-200 bg-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-2">
                    <Reveal className="border border-stone-200 bg-[#FAF8F5] p-8 sm:p-10">
                        <span className="inline-flex size-12 items-center justify-center bg-[#1F3A2B] text-[#FAF8F5]">
                            <Eye className="size-6" />
                        </span>
                        <h3 className="mt-5 font-serif text-2xl font-light text-[#0F1A13]">Visi</h3>
                        <p className="mt-3 leading-relaxed text-stone-600">{visiMisi.visi}</p>
                    </Reveal>
                    <Reveal delay={120} className="border border-stone-200 bg-[#FAF8F5] p-8 sm:p-10">
                        <span className="inline-flex size-12 items-center justify-center bg-[#A98446] text-white">
                            <Target className="size-6" />
                        </span>
                        <h3 className="mt-5 font-serif text-2xl font-light text-[#0F1A13]">Misi</h3>
                        <ul className="mt-3 space-y-2.5">
                            {visiMisi.misi.map((m, i) => (
                                <li key={i} className="flex gap-3 text-stone-600">
                                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#A98446]" />
                                    {m}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* Nilai */}
            <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
                <SectionHeading eyebrow="Prinsip" title="Nilai-Nilai Utama" />
                <div className="mt-14 grid gap-px overflow-hidden border border-stone-200 bg-stone-200 sm:grid-cols-2 lg:grid-cols-4">
                    {nilai.map((n) => (
                        <div key={n.title} className="group bg-white p-8 text-center transition-colors hover:bg-[#FAF8F5]">
                            <span className="mx-auto inline-flex size-12 items-center justify-center bg-[#1F3A2B]/5 text-[#1F3A2B] transition-colors group-hover:bg-[#1F3A2B] group-hover:text-[#FAF8F5]">
                                <n.icon className="size-6" />
                            </span>
                            <h4 className="mt-4 font-serif text-lg font-medium text-[#0F1A13]">{n.title}</h4>
                            <p className="mt-2 text-sm leading-relaxed text-stone-500">{n.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Struktur */}
            <section className="border-t border-stone-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <SectionHeading eyebrow="Pengurus" title="Struktur Organisasi" />
                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {struktur.map((p) => (
                            <div key={p.name} className="flex flex-col items-center border border-stone-200 bg-[#FAF8F5] p-8 text-center">
                                <span className="inline-flex size-20 items-center justify-center rounded-full bg-[#1F3A2B] font-serif text-2xl font-light text-[#FAF8F5]">
                                    {p.name.split(' ').slice(-1)[0].charAt(0)}
                                </span>
                                <h4 className="mt-4 font-serif font-medium text-[#0F1A13]">{p.name}</h4>
                                <p className="mt-1 text-sm text-[#A98446]">{p.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
