import { PageHero } from '@/components/public/page-hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PublicLayout from '@/layouts/public-layout';
import { tenant } from '@/lib/mock-data';
import { Head } from '@inertiajs/react';
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export default function Kontak() {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <PublicLayout>
            <Head title="Kontak" />
            <PageHero
                title="Hubungi Kami"
                description="Sampaikan pertanyaan, saran, atau kerja sama. Kami senang mendengar dari Anda."
                crumbs={[{ label: 'Beranda', href: '/' }, { label: 'Kontak' }]}
            />

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-10 lg:grid-cols-5">
                    {/* info */}
                    <div className="lg:col-span-2">
                        <h2 className="font-serif text-2xl font-light text-[#0F1A13]">Informasi Kontak</h2>
                        <ul className="mt-6 space-y-5">
                            <InfoItem icon={MapPin} label="Alamat">
                                {tenant.address}
                            </InfoItem>
                            <InfoItem icon={Phone} label="Telepon">
                                {tenant.phone}
                            </InfoItem>
                            <InfoItem icon={Mail} label="Email">
                                {tenant.email}
                            </InfoItem>
                            <InfoItem icon={Clock} label="Jam Operasional">
                                Senin–Sabtu, 07.00–15.00 WIB
                            </InfoItem>
                        </ul>

                        <div className="mt-8 overflow-hidden border border-stone-200">
                            <iframe
                                title="Peta lokasi yayasan"
                                src="https://www.google.com/maps?q=Tanggunggunung,Tulungagung&output=embed"
                                className="h-64 w-full grayscale"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                    {/* form */}
                    <div className="lg:col-span-3">
                        <div className="border border-stone-200 bg-white p-6 sm:p-8">
                            {sent ? (
                                <div className="flex flex-col items-center py-12 text-center">
                                    <CheckCircle2 className="size-16 text-[#1F3A2B]" />
                                    <h3 className="mt-4 font-serif text-2xl font-light text-[#0F1A13]">Pesan Terkirim</h3>
                                    <p className="mt-2 max-w-sm text-stone-500">
                                        Jazakumullahu khairan. Pesan Anda telah kami terima dan akan segera kami tindak lanjuti.
                                    </p>
                                    <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>
                                        Kirim Pesan Lain
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <Field id="nama" label="Nama Lengkap" required>
                                            <Input id="nama" required placeholder="Nama Anda" />
                                        </Field>
                                        <Field id="email" label="Email" required>
                                            <Input id="email" type="email" required placeholder="email@contoh.com" />
                                        </Field>
                                    </div>
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <Field id="telepon" label="Nomor Telepon">
                                            <Input id="telepon" type="tel" placeholder="0812-xxxx-xxxx" />
                                        </Field>
                                        <Field id="subjek" label="Subjek" required>
                                            <Input id="subjek" required placeholder="Perihal pesan" />
                                        </Field>
                                    </div>
                                    <Field id="pesan" label="Pesan" required>
                                        <textarea
                                            id="pesan"
                                            required
                                            rows={5}
                                            placeholder="Tuliskan pesan Anda…"
                                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        />
                                    </Field>
                                    <Button type="submit" size="lg" className="w-full bg-primary sm:w-auto">
                                        <Send className="size-4" /> Kirim Pesan
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

function InfoItem({ icon: Icon, label, children }: { icon: typeof MapPin; label: string; children: React.ReactNode }) {
    return (
        <li className="flex gap-4">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
            </span>
            <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground">{children}</p>
            </div>
        </li>
    );
}

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>
                {label}
                {required && <span className="ml-0.5 text-destructive">*</span>}
            </Label>
            {children}
        </div>
    );
}
