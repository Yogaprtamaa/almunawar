# Catatan Pekerjaan UI — Situs Publik Yayasan Al-Munawwar

Dokumen ini merangkum seluruh pekerjaan front-end situs publik (donatur/wali-facing)
Yayasan Pendidikan Islam Al-Munawwar: dari referensi desain awal, redesain editorial,
navbar mengambang, animasi, hingga integrasi konten resmi.

- **Stack**: Laravel + Inertia + React 19 + TypeScript + Tailwind v4 + shadcn/ui
- **Status**: prototipe front-end; data masih dari `resources/js/lib/mock-data.ts`
  (siap diganti props controller saat backend disambung)
- **Terakhir diperbarui**: 17 Juni 2026

---

## 1. Identitas & Konten

Sumber: konten resmi situs Yayasan Al-Munawwar (al-munawwar.or.id), Tulungagung.

| Field | Nilai |
|---|---|
| Nama | Yayasan Islam Al-Munawwar |
| Tagline | Pendidikan Berkarakter, Prestasi Unggul |
| Alamat | Ds. Jengglungharjo, Kec. Tanggunggunung, Kab. Tulungagung |
| Telepon | 0896-3954-5861 |
| Email | yayasanpendidikanislamalmunaww@gmail.com |
| Website | al-munawwar.or.id |

**Nilai utama**: Kolaborasi & Kepedulian · Ilmu & Prestasi · Amanah · Akhlak Mulia

**Unit & Program** (jadi data `programs`):
1. KB–TK Islam Al-Munawwar (PAUD)
2. SDIT Al-Munawwar (Sekolah Dasar)
3. Panti Asuhan Al-Munawwar (Sosial)
4. Masjid Al-Munawwar (Dakwah)
5. Tahfidz & Iqra (Ekstrakurikuler)
6. Silat & Memanah (Ekstrakurikuler)

**Berita** (data `articles`): PPDB 2026 dibuka · Qurban Idul Adha 1447 H ·
Prestasi siswa SDIT di TKA · SDIT kembali meraih prestasi.

> Catatan: nama pengurus di halaman Profil dan angka statistik masih *placeholder* prototipe.

---

## 2. Sistem Desain (Editorial)

Gaya akhir: **editorial/mewah-minimalis** — kanvas cream, tinta hijau hutan,
aksen emas bronze, sudut tajam, tipografi serif `font-light`, gambar grayscale→warna saat hover.

### Palet (hex acuan + token)
Token warna di `resources/css/app.css` (`:root`) diselaraskan ke hex berikut, sehingga
komponen berbasis token (shadcn) otomatis ikut palet:

| Peran | Hex | Token |
|---|---|---|
| Background (cream) | `#FAF8F5` | `--background` |
| Ink/teks gelap | `#0F1A13` / `#1E2E24` | `--foreground` |
| Primary (hijau) | `#1F3A2B` (hover `#15281D`) | `--primary` |
| Gold bronze | `#A98446` | `--gold`, `--ring` |
| Kartu | `#FFFFFF` | `--card` |
| Border halus | stone-200 | `--border` |

### Tipografi
- **Serif** (`font-serif`, `font-light`/italic) → judul & angka elegan
- **Sans** (`font-sans`) → body
- **`font-display`** (Amiri) → wordmark brand & H1 hero
- **`font-arabic`** (Amiri Quran) → teks Arab

### Animasi (utility di `app.css`, hormati `prefers-reduced-motion`)
- `animate-float` / `animate-float-delayed` — gerak mengambang lembut aksen hero
- `animate-spin-slow` — rotasi pelan ornamen
- Keyframe lama `float-y` + reveal/count-up (lihat §4)

---

## 3. Navbar Mengambang (Floating Nav)

Di `resources/js/layouts/public-layout.tsx` (`FloatingNav`):
- `fixed inset-x-0 top-0` + `flex justify-center` → **pill melayang di tengah**, ikut saat scroll.
- Reaktif scroll: di atas transparan tipis; setelah `scrollY > 24` jadi solid + blur +
  border + shadow halus.
- `pointer-events-none` di header, `pointer-events-auto` di pill (area kosong tak menghalangi klik).
- Isi: brand + link tengah + tombol Donasi + menu mobile (Sheet).
- Beranda full-bleed di belakang nav; halaman lain otomatis `pt-28`.

---

## 4. Komponen & Hook Baru

| File | Fungsi |
|---|---|
| `hooks/use-reveal.ts` | Reveal fade/slide saat masuk viewport (IntersectionObserver) |
| `hooks/use-count-up.ts` | Animasi angka 0→target (easing) |
| `components/public/reveal.tsx` | Wrapper `<Reveal>` dengan stagger `delay` |
| `components/public/stat-counter.tsx` | Statistik count-up |
| `components/public/carousel.tsx` | Carousel scroll-snap (panah, dot, autoplay, touch) tanpa dependency |

Semua menghormati `prefers-reduced-motion`.

### Komponen bersama yang ditulis ulang (editorial)
- `components/public/page-hero.tsx` — header sub-halaman (cream, breadcrumb, judul serif)
- `components/public/program-card.tsx` — kartu unit/program
- `components/public/article-card.tsx` — kartu berita
- `components/public/section-heading.tsx` — eyebrow bronze + judul serif

---

## 5. Halaman

| Rute | File | Catatan |
|---|---|---|
| `/` | `pages/welcome.tsx` | Hero sinematik, stats, filosofi (4 nilai), galeri program (carousel), jadwal sholat + ayat, testimoni (carousel), CTA donasi + progress bar |
| `/profil` | `pages/public/profil.tsx` | Tentang, Visi-Misi, 4 Nilai Utama, Struktur |
| `/program` | `pages/public/program/index.tsx` | Filter kategori (kotak tajam) + grid `ProgramCard` |
| `/program/{slug}` | `pages/public/program/show.tsx` | Detail unit + sidebar info + program terkait |
| `/berita` | `pages/public/berita/index.tsx` | Filter + pencarian + grid `ArticleCard` |
| `/berita/{slug}` | `pages/public/berita/show.tsx` | Artikel + share + berita terkait |
| `/galeri` | `pages/public/galeri.tsx` | Tab Foto/Video, tile grayscale |
| `/kontak` | `pages/public/kontak.tsx` | Info kontak asli + peta + form |
| `/donasi` | `pages/public/donasi/index.tsx` | Wizard 5 langkah (nominal→data→metode→bayar→sukses) |

Routing di `routes/web.php` (Inertia, data mock di front-end).

---

## 6. Referensi Desain Awal

`docs/ui-reference/` menyimpan referensi Stitch "Noor Landing Page" (sumber bahasa visual
awal: bentuk lengkung, foto bulat, stat-circle) — lihat `docs/ui-reference/README.md`.
Desain kemudian berkembang menjadi gaya editorial di atas.

---

## 7. Verifikasi

```bash
npm run dev      # jalankan dev server, buka /
npm run build    # build produksi (lulus)
npm run lint     # eslint --fix (bersih)
```

Catatan tema: situs publik dipaksa **light mode** (default appearance `light` di
`hooks/use-appearance.tsx`). Jika sebelumnya tersimpan `appearance: "dark"` di localStorage,
hapus: `localStorage.removeItem('appearance')`.

---

## 8. Langkah Lanjut (Saran)

- Ganti nama pengurus & statistik dengan data asli.
- Sambungkan ke backend (controller → props Inertia) menggantikan `mock-data.ts`.
- Integrasi PPDB (form/berkas) dan unduhan brosur PDF (TK & SD).
- Payment gateway nyata untuk alur donasi.
- Jadwal sholat dinamis sesuai lokasi.
