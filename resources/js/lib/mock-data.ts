/**
 * Front-end content for the UI prototype. In production these shapes are
 * provided by the Laravel controllers as Inertia props (tenant-scoped).
 *
 * Content sourced from the official site of Yayasan Pendidikan Islam
 * Al-Munawwar (al-munawwar.or.id), Tulungagung.
 */

export interface Tenant {
    brandName: string;
    brandShort: string;
    tagline: string;
    addressCity: string;
    address: string;
    phone: string;
    email: string;
    website: string;
}

export const tenant: Tenant = {
    brandName: 'Yayasan Islam Al-Munawwar',
    brandShort: 'Al-Munawwar',
    tagline: 'Pendidikan Berkarakter, Prestasi Unggul',
    addressCity: 'Tulungagung, Jawa Timur',
    address: 'Ds. Jengglungharjo, Kec. Tanggunggunung, Kab. Tulungagung',
    phone: '0896-3954-5861',
    email: 'yayasanpendidikanislamalmunaww@gmail.com',
    website: 'al-munawwar.or.id',
};

export interface Stat {
    label: string;
    value: string;
    suffix?: string;
}

export const stats: Stat[] = [
    { label: 'Siswa Aktif', value: '350', suffix: '+' },
    { label: 'Tenaga Pendidik', value: '40' },
    { label: 'Unit Lembaga', value: '4' },
    { label: 'Anak Asuh Panti', value: '60', suffix: '+' },
];

export interface Program {
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    schedule: string;
    image: string;
}

export const programs: Program[] = [
    {
        slug: 'kb-tk-islam-al-munawwar',
        title: 'KB–TK Islam Al-Munawwar',
        category: 'PAUD',
        excerpt: 'Pendidikan anak usia dini yang memadukan kurikulum nasional dengan nilai-nilai Islam untuk membentuk karakter sejak dini.',
        schedule: 'Senin–Jumat · 07.30–11.00 WIB',
        image: 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=800&q=80',
    },
    {
        slug: 'sdit-al-munawwar',
        title: 'SDIT Al-Munawwar',
        category: 'Sekolah Dasar',
        excerpt: 'Sekolah dasar Islam terpadu yang membentuk generasi berakhlak mulia, berprestasi akademik, dan cinta Al-Qur’an.',
        schedule: 'Senin–Jumat · 07.00–14.00 WIB',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    },
    {
        slug: 'panti-asuhan-al-munawwar',
        title: 'Panti Asuhan Al-Munawwar',
        category: 'Sosial',
        excerpt: 'Rumah kasih sayang bagi anak yatim dan dhuafa — memberikan tempat tinggal, pendidikan, dan pendampingan.',
        schedule: 'Pembinaan harian',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
    },
    {
        slug: 'masjid-al-munawwar',
        title: 'Masjid Al-Munawwar',
        category: 'Dakwah',
        excerpt: 'Pusat ibadah, pendidikan keagamaan, dan kegiatan sosial kemasyarakatan bagi jamaah dan lingkungan sekitar.',
        schedule: 'Kajian rutin mingguan',
        image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80',
    },
    {
        slug: 'tahfidz-iqra',
        title: 'Tahfidz & Iqra',
        category: 'Ekstrakurikuler',
        excerpt: 'Pembiasaan membaca dan menghafal Al-Qur’an untuk menumbuhkan kedekatan dengan kitab suci sejak dini.',
        schedule: 'Setiap hari sekolah',
        image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    },
    {
        slug: 'silat-memanah',
        title: 'Silat & Memanah',
        category: 'Ekstrakurikuler',
        excerpt: 'Bela diri, kebugaran, fokus, dan konsentrasi — pengembangan fisik dan mental sesuai sunnah.',
        schedule: 'Sabtu · Ekstrakurikuler',
        image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&q=80',
    },
];

export interface Article {
    slug: string;
    title: string;
    category: string;
    date: string;
    author: string;
    excerpt: string;
    image: string;
}

export const articles: Article[] = [
    {
        slug: 'penerimaan-siswa-baru-2026-dibuka',
        title: 'Penerimaan Siswa Baru KB–TK–SD Tahun 2026 Resmi Dibuka',
        category: 'Pengumuman',
        date: '10 Juni 2026',
        author: 'Panitia PPDB',
        excerpt: 'Pendaftaran peserta didik baru untuk unit KB, TK, dan SDIT tahun ajaran 2026 telah dibuka. Brosur tersedia untuk diunduh.',
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
    },
    {
        slug: 'penyembelihan-hewan-qurban-1447h',
        title: 'Penyembelihan Hewan Qurban Idul Adha 1447 H di Lingkungan Al-Munawwar',
        category: 'Kegiatan',
        date: '7 Juni 2026',
        author: 'Panitia Qurban',
        excerpt: 'Keluarga besar Al-Munawwar menyelenggarakan penyembelihan hewan qurban dan membagikan daging kepada warga sekitar.',
        image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800&q=80',
    },
    {
        slug: 'prestasi-siswa-sdit-tka',
        title: 'Prestasi Siswa SDIT Al-Munawwar di Tes Kemampuan Akademik (TKA)',
        category: 'Prestasi',
        date: '2 Juni 2026',
        author: 'Humas Yayasan',
        excerpt: 'Siswa-siswi SDIT Al-Munawwar menorehkan hasil membanggakan dalam Tes Kemampuan Akademik tingkat daerah.',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
    },
    {
        slug: 'sdit-al-munawwar-raih-prestasi',
        title: 'SDIT Al-Munawwar Kembali Meraih Prestasi',
        category: 'Prestasi',
        date: '24 Mei 2026',
        author: 'Humas Yayasan',
        excerpt: 'Konsistensi pembinaan akademik dan karakter kembali berbuah prestasi bagi para siswa SDIT Al-Munawwar.',
        image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80',
    },
];

export interface GalleryAlbum {
    slug: string;
    title: string;
    count: number;
    cover: string;
}

export const albums: GalleryAlbum[] = [
    { slug: 'qurban-1447h', title: 'Qurban Idul Adha 1447 H', count: 24, cover: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800&q=80' },
    { slug: 'kegiatan-belajar', title: 'Kegiatan Belajar Siswa', count: 36, cover: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80' },
    { slug: 'ekstrakurikuler', title: 'Ekstrakurikuler', count: 18, cover: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&q=80' },
    { slug: 'panti-asuhan', title: 'Panti Asuhan', count: 20, cover: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80' },
    { slug: 'kegiatan-masjid', title: 'Kegiatan Masjid', count: 28, cover: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80' },
    { slug: 'prestasi-siswa', title: 'Wisuda & Prestasi', count: 32, cover: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80' },
];

export interface Donor {
    name: string;
    amount: number;
    message?: string;
    timeAgo: string;
}

export const recentDonors: Donor[] = [
    { name: 'Hamba Allah', amount: 1000000, message: 'Semoga menjadi amal jariyah.', timeAgo: '5 menit lalu' },
    { name: 'Ahmad Fauzi', amount: 250000, message: 'Barakallahu fiikum.', timeAgo: '22 menit lalu' },
    { name: 'Keluarga Hidayat', amount: 500000, timeAgo: '1 jam lalu' },
    { name: 'Hamba Allah', amount: 100000, message: 'Untuk anak-anak panti.', timeAgo: '2 jam lalu' },
    { name: 'Siti Nurhaliza', amount: 2000000, message: 'Semoga istiqomah.', timeAgo: '3 jam lalu' },
];

export const donationProgress = {
    raised: 487_500_000,
    target: 750_000_000,
    donorCount: 1_284,
    title: 'Operasional & Pembangunan Panti Al-Munawwar',
};

export const presetAmounts = [10_000, 50_000, 100_000, 500_000, 1_000_000];

export function formatRupiah(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);
}
