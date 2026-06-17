# UI Reference — Noor Landing Page

Referensi desain dari Stitch (project "Desain Kreatif Visual"). **Bukan kode produksi** —
dipakai sebagai acuan visual saat membangun komponen React (Inertia) + Tailwind v4 + shadcn/ui.

## File
- `noor-landing.html` — markup Stitch lengkap (Tailwind CDN). Buka di browser untuk preview.
- `noor-landing-screenshot.png` — render desain penuh.

## Design tokens
| Token        | Hex       | Pemakaian                 |
|--------------|-----------|---------------------------|
| noor-cream   | `#FFF8F5` | background utama          |
| noor-brown   | `#3E2B20` | teks, tombol, footer      |
| noor-gold    | `#F2C94C` | stat circle, aksen bulan  |
| noor-purple  | `#8E82B6` | kartu prayer times        |
| noor-orange  | `#F2994A` | aksen bintang, lingkaran  |
| border       | `#EEDCC5` | garis pemisah halus       |

## Tipografi
- Heading: **Playfair Display** (serif, 700)
- Body: **DM Sans** (400/500/700)

## Bentuk khas
- Hero kiri: `border-radius: 150px 150px 0 150px`
- Hero kanan: `border-radius: 150px 150px 150px 0`
- Tombol pill: `rounded-full px-6 py-2`

## Struktur section (urutan)
1. Header + nav (Home / About / Prayer Times / Zakat) + tombol "Get Started"
2. Hero — "Every Night Glows with Mercy"
3. Logo bar partner
4. "Every Second of Ramadan is Precious" + stat circle 1,000+
5. Ramadan Essentials — 4 kartu lingkaran + carousel arrows
6. Testimonials komunitas
7. Daily Spiritual Guidance — kartu prayer times (purple) + jadwal Iftar/Suhoor
8. CTA — "Make This Ramadan More Meaningful" + stat 45,000+
9. Footer (Quick Links / Resources / Contact)
