import { Bismillah } from '@/components/islamic/bismillah';
import { PageHero } from '@/components/public/page-hero';
import { QrPlaceholder } from '@/components/public/qr-placeholder';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PublicLayout from '@/layouts/public-layout';
import { donationProgress, formatRupiah, presetAmounts, recentDonors } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Heart, QrCode, Smartphone, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';

type Step = 'nominal' | 'data' | 'metode' | 'bayar' | 'sukses';
type Method = 'qris' | 'va' | 'ewallet';

const steps: { key: Step; label: string }[] = [
    { key: 'nominal', label: 'Nominal' },
    { key: 'data', label: 'Data Diri' },
    { key: 'metode', label: 'Metode' },
    { key: 'bayar', label: 'Pembayaran' },
];

export default function Donasi() {
    const [step, setStep] = useState<Step>('nominal');
    const [amount, setAmount] = useState<number>(100_000);
    const [custom, setCustom] = useState('');
    const [name, setName] = useState('');
    const [method, setMethod] = useState<Method>('qris');

    const finalAmount = custom ? Number(custom.replace(/\D/g, '')) : amount;
    const stepIndex = steps.findIndex((s) => s.key === step);

    return (
        <PublicLayout>
            <Head title="Donasi" />
            <PageHero
                title="Salurkan Donasi"
                description="Tunaikan sedekah, infak, dan wakaf terbaik Anda dengan mudah dan aman."
                crumbs={[{ label: 'Beranda', href: '/' }, { label: 'Donasi' }]}
            />

            {step !== 'sukses' && (
                <div className="border-b border-border bg-secondary/40">
                    <ol className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
                        {steps.map((s, i) => (
                            <li key={s.key} className="flex flex-1 items-center last:flex-none">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={cn(
                                            'flex size-8 items-center justify-center rounded-full text-sm font-bold transition-colors',
                                            i < stepIndex
                                                ? 'bg-primary text-primary-foreground'
                                                : i === stepIndex
                                                  ? 'bg-gold text-gold-foreground'
                                                  : 'bg-muted text-muted-foreground',
                                        )}
                                    >
                                        {i < stepIndex ? <CheckCircle2 className="size-5" /> : i + 1}
                                    </span>
                                    <span className={cn('hidden text-sm font-medium sm:block', i <= stepIndex ? 'text-foreground' : 'text-muted-foreground')}>
                                        {s.label}
                                    </span>
                                </div>
                                {i < steps.length - 1 && <span className={cn('mx-2 h-0.5 flex-1', i < stepIndex ? 'bg-primary' : 'bg-border')} />}
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            <section className="mx-auto max-w-6xl px-6 py-14">
                {step === 'nominal' && (
                    <div className="grid gap-10 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <NominalStep
                                amount={amount}
                                custom={custom}
                                onPreset={(v) => {
                                    setAmount(v);
                                    setCustom('');
                                }}
                                onCustom={setCustom}
                                onNext={() => setStep('data')}
                                finalAmount={finalAmount}
                            />
                        </div>
                        <ProgressSidebar />
                    </div>
                )}

                {step === 'data' && (
                    <div className="mx-auto max-w-2xl">
                        <DataStep
                            name={name}
                            onName={setName}
                            finalAmount={finalAmount}
                            onBack={() => setStep('nominal')}
                            onNext={() => setStep('metode')}
                        />
                    </div>
                )}

                {step === 'metode' && (
                    <div className="mx-auto max-w-2xl">
                        <MetodeStep method={method} onMethod={setMethod} finalAmount={finalAmount} onBack={() => setStep('data')} onNext={() => setStep('bayar')} />
                    </div>
                )}

                {step === 'bayar' && (
                    <div className="mx-auto max-w-2xl">
                        <BayarStep method={method} finalAmount={finalAmount} onBack={() => setStep('metode')} onPaid={() => setStep('sukses')} />
                    </div>
                )}

                {step === 'sukses' && <SuksesStep name={name} finalAmount={finalAmount} method={method} />}
            </section>
        </PublicLayout>
    );
}

/* ── Step 1: Nominal ─────────────────────────────────────── */
function NominalStep({
    amount,
    custom,
    onPreset,
    onCustom,
    onNext,
    finalAmount,
}: {
    amount: number;
    custom: string;
    onPreset: (v: number) => void;
    onCustom: (v: string) => void;
    onNext: () => void;
    finalAmount: number;
}) {
    return (
        <div className="border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-serif text-2xl font-light text-[#0F1A13]">Pilih Nominal Donasi</h2>
            <p className="mt-1 text-sm text-stone-500">Tentukan jumlah kebaikan yang ingin Anda tunaikan.</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {presetAmounts.map((v) => (
                    <button
                        key={v}
                        onClick={() => onPreset(v)}
                        className={cn(
                            'cursor-pointer border-2 p-4 text-center font-serif text-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A98446]',
                            !custom && amount === v ? 'border-[#A98446] bg-[#A98446]/10 text-[#1F3A2B]' : 'border-stone-200 bg-white text-[#0F1A13] hover:border-stone-400',
                        )}
                    >
                        {formatRupiah(v)}
                    </button>
                ))}
            </div>

            <div className="mt-5">
                <Label htmlFor="custom">Atau masukkan nominal lain</Label>
                <div className="mt-2 flex items-center rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring">
                    <span className="px-3 text-sm font-semibold text-muted-foreground">Rp</span>
                    <input
                        id="custom"
                        inputMode="numeric"
                        value={custom ? Number(custom.replace(/\D/g, '')).toLocaleString('id-ID') : ''}
                        onChange={(e) => onCustom(e.target.value)}
                        placeholder="Minimal 1.000"
                        className="h-11 w-full bg-transparent pr-3 text-sm outline-none"
                    />
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between border border-stone-200 bg-[#FAF8F5] p-4">
                <span className="text-sm text-stone-500">Total Donasi</span>
                <span className="font-serif text-2xl font-light text-[#1F3A2B]">{formatRupiah(finalAmount || 0)}</span>
            </div>

            <Button onClick={onNext} disabled={finalAmount < 1000} size="lg" className="mt-6 w-full rounded-none bg-[#1F3A2B] text-[#FAF8F5] hover:bg-[#15281D]">
                Lanjutkan Donasi <ArrowRight className="size-4" />
            </Button>
        </div>
    );
}

function ProgressSidebar() {
    const pct = Math.round((donationProgress.raised / donationProgress.target) * 100);
    return (
        <aside className="space-y-5">
            <div className="border border-stone-200 bg-white p-6 shadow-sm">
                <h3 className="font-serif font-medium text-[#0F1A13]">{donationProgress.title}</h3>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-gold" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                    <span className="font-display text-xl font-bold text-primary">{formatRupiah(donationProgress.raised)}</span>
                    <span className="text-sm text-muted-foreground">{pct}%</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">terkumpul dari target {formatRupiah(donationProgress.target)}</p>
                <p className="mt-3 text-sm font-medium text-foreground">{donationProgress.donorCount.toLocaleString('id-ID')} donatur telah berpartisipasi</p>
            </div>

            <div className="border border-stone-200 bg-white p-6 shadow-sm">
                <h3 className="font-serif font-medium text-[#0F1A13]">Donatur Terbaru</h3>
                <ul className="mt-4 space-y-4">
                    {recentDonors.slice(0, 4).map((d, i) => (
                        <li key={i} className="flex gap-3">
                            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Heart className="size-4" />
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-foreground">{d.name}</p>
                                <p className="text-xs text-gold">{formatRupiah(d.amount)} · {d.timeAgo}</p>
                                {d.message && <p className="mt-0.5 truncate text-xs italic text-muted-foreground">“{d.message}”</p>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

/* ── Step 2: Data Diri ───────────────────────────────────── */
function DataStep({
    name,
    onName,
    finalAmount,
    onBack,
    onNext,
}: {
    name: string;
    onName: (v: string) => void;
    finalAmount: number;
    onBack: () => void;
    onNext: () => void;
}) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onNext();
            }}
            className="border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
        >
            <h2 className="font-serif text-2xl font-light text-[#0F1A13]">Data Donatur</h2>
            <p className="mt-1 text-sm text-muted-foreground">
                Donasi Anda: <span className="font-semibold text-primary">{formatRupiah(finalAmount)}</span>
            </p>

            <div className="mt-6 space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap <span className="text-destructive">*</span></Label>
                    <Input id="nama" required value={name} onChange={(e) => onName(e.target.value)} placeholder="Nama Anda" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                    <Input id="email" type="email" required placeholder="email@contoh.com" />
                    <p className="text-xs text-muted-foreground">Bukti donasi akan dikirim ke email ini.</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="telp">Nomor Telepon</Label>
                    <Input id="telp" type="tel" placeholder="0812-xxxx-xxxx" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="doa">Pesan / Doa</Label>
                    <textarea
                        id="doa"
                        rows={3}
                        maxLength={200}
                        placeholder="Tuliskan doa atau harapan Anda…"
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </div>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-secondary/50 p-3">
                    <Checkbox defaultChecked className="mt-0.5" />
                    <span className="text-sm text-foreground">Tampilkan nama saya di daftar donatur publik</span>
                </label>
            </div>

            <div className="mt-7 flex gap-3">
                <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                    <ArrowLeft className="size-4" /> Kembali
                </Button>
                <Button type="submit" className="flex-1 rounded-none bg-[#1F3A2B] text-[#FAF8F5] hover:bg-[#15281D]">
                    Konfirmasi <ArrowRight className="size-4" />
                </Button>
            </div>
        </form>
    );
}

/* ── Step 3: Metode ──────────────────────────────────────── */
function MetodeStep({
    method,
    onMethod,
    finalAmount,
    onBack,
    onNext,
}: {
    method: Method;
    onMethod: (m: Method) => void;
    finalAmount: number;
    onBack: () => void;
    onNext: () => void;
}) {
    const options: { key: Method; icon: typeof QrCode; title: string; desc: string; badge?: string }[] = [
        { key: 'qris', icon: QrCode, title: 'QRIS', desc: 'Scan dengan e-wallet atau m-banking apa pun', badge: 'Rekomendasi' },
        { key: 'va', icon: Wallet, title: 'Virtual Account', desc: 'BCA, BNI, BRI, Mandiri' },
        { key: 'ewallet', icon: Smartphone, title: 'E-Wallet', desc: 'GoPay, OVO, DANA, ShopeePay, LinkAja' },
    ];
    return (
        <div className="border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-serif text-2xl font-light text-[#0F1A13]">Metode Pembayaran</h2>
            <p className="mt-1 text-sm text-muted-foreground">
                Total: <span className="font-semibold text-primary">{formatRupiah(finalAmount)}</span>
            </p>

            <div className="mt-6 space-y-3">
                {options.map((o) => (
                    <button
                        key={o.key}
                        onClick={() => onMethod(o.key)}
                        className={cn(
                            'flex w-full cursor-pointer items-center gap-4 border-2 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A98446]',
                            method === o.key ? 'border-[#A98446] bg-[#A98446]/10' : 'border-stone-200 hover:border-stone-400',
                        )}
                    >
                        <span className={cn('inline-flex size-11 items-center justify-center', method === o.key ? 'bg-[#1F3A2B] text-[#FAF8F5]' : 'bg-[#FAF8F5] text-[#1F3A2B]')}>
                            <o.icon className="size-5" />
                        </span>
                        <span className="flex-1">
                            <span className="flex items-center gap-2 font-serif font-medium text-[#0F1A13]">
                                {o.title}
                                {o.badge && <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold text-gold-foreground">{o.badge}</span>}
                            </span>
                            <span className="text-sm text-muted-foreground">{o.desc}</span>
                        </span>
                        <span className={cn('size-5 rounded-full border-2', method === o.key ? 'border-gold bg-gold' : 'border-muted-foreground/40')} />
                    </button>
                ))}
            </div>

            <div className="mt-7 flex gap-3">
                <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                    <ArrowLeft className="size-4" /> Kembali
                </Button>
                <Button onClick={onNext} className="flex-1 rounded-none bg-[#1F3A2B] text-[#FAF8F5] hover:bg-[#15281D]">
                    Lanjut ke Pembayaran <ArrowRight className="size-4" />
                </Button>
            </div>
        </div>
    );
}

/* ── Step 4: Bayar ───────────────────────────────────────── */
function BayarStep({ method, finalAmount, onBack, onPaid }: { method: Method; finalAmount: number; onBack: () => void; onPaid: () => void }) {
    const [secondsLeft, setSecondsLeft] = useState(15 * 60);
    useEffect(() => {
        const t = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
        return () => clearInterval(t);
    }, []);
    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const ss = String(secondsLeft % 60).padStart(2, '0');

    return (
        <div className="border border-stone-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-foreground">
                <Clock className="size-4 text-gold" /> Selesaikan dalam <span className="font-bold tabular-nums text-primary">{mm}:{ss}</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Total Pembayaran</p>
            <p className="font-display text-3xl font-bold text-primary">{formatRupiah(finalAmount)}</p>

            {method === 'qris' && (
                <div className="mt-6 flex flex-col items-center">
                    <QrPlaceholder className="size-56" />
                    <p className="mt-4 max-w-xs text-sm text-muted-foreground">Buka aplikasi e-wallet atau m-banking Anda, pilih bayar QRIS, lalu pindai kode di atas.</p>
                </div>
            )}

            {method === 'va' && (
                <div className="mt-6 space-y-3 text-left">
                    {[
                        ['Bank', 'BCA Virtual Account'],
                        ['Nomor VA', '8808 0812 3456 7890'],
                        ['Atas Nama', 'Yayasan Al-Munawar'],
                    ].map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between rounded-lg bg-secondary/60 px-4 py-3">
                            <span className="text-sm text-muted-foreground">{k}</span>
                            <span className="font-semibold text-foreground">{v}</span>
                        </div>
                    ))}
                    <p className="text-xs text-muted-foreground">Transfer tepat hingga 3 digit terakhir. Berlaku 24 jam.</p>
                </div>
            )}

            {method === 'ewallet' && (
                <div className="mt-6 rounded-xl bg-secondary/60 p-6">
                    <Smartphone className="mx-auto size-10 text-primary" />
                    <p className="mt-3 text-sm text-muted-foreground">Anda akan diarahkan ke halaman pembayaran e-wallet untuk menyelesaikan transaksi.</p>
                </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="outline" onClick={onBack} className="sm:flex-1">
                    <ArrowLeft className="size-4" /> Ganti Metode
                </Button>
                {/* Prototype: simulate gateway webhook success */}
                <Button onClick={onPaid} className="bg-primary sm:flex-1">
                    Simulasikan Pembayaran Berhasil
                </Button>
            </div>
        </div>
    );
}

/* ── Step 5: Sukses ──────────────────────────────────────── */
function SuksesStep({ name, finalAmount, method }: { name: string; finalAmount: number; method: Method }) {
    const methodLabel = { qris: 'QRIS', va: 'Virtual Account BCA', ewallet: 'E-Wallet' }[method];
    return (
        <div className="mx-auto max-w-xl text-center">
            <div className="relative mx-auto flex size-24 items-center justify-center rounded-full bg-[#1F3A2B]/10">
                <CheckCircle2 className="size-14 text-[#1F3A2B]" />
            </div>
            <Bismillah size="sm" className="mt-8" />
            <h2 className="mt-6 font-serif text-3xl font-light text-[#0F1A13]">Jazakumullahu Khairan!</h2>
            <p className="mt-3 text-stone-500">
                Donasi Anda telah kami terima. Semoga menjadi amal jariyah yang terus mengalir pahalanya. آمين
            </p>

            <div className="mt-8 border border-stone-200 bg-white p-6 text-left shadow-sm">
                <dl className="space-y-3 text-sm">
                    {[
                        ['Donatur', name || 'Hamba Allah'],
                        ['Nominal', formatRupiah(finalAmount)],
                        ['Metode', methodLabel],
                        ['ID Transaksi', 'AMW-1-1718' + String(Math.floor(Math.random() * 90000) + 10000)],
                        ['Status', 'Berhasil'],
                    ].map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0">
                            <dt className="text-muted-foreground">{k}</dt>
                            <dd className={cn('font-semibold', k === 'Status' ? 'text-primary' : 'text-foreground')}>{v}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild className="rounded-none bg-[#1F3A2B] text-[#FAF8F5] hover:bg-[#15281D]">
                    <Link href="/donasi">
                        <Heart className="size-4" /> Donasi Lagi
                    </Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/">Kembali ke Beranda</Link>
                </Button>
            </div>
        </div>
    );
}
