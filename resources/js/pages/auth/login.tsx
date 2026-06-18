import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Masuk ke Panel Admin" description="Masukkan email dan password Anda untuk mengakses dasbor">
            <Head title="Masuk" />

            {status && (
                <div className="mb-4 rounded-md bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700 ring-1 ring-green-200">
                    {status}
                </div>
            )}

            <form className="flex flex-col gap-5" onSubmit={submit}>
                <div className="grid gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Alamat Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="admin@example.com"
                            className="focus-visible:ring-[#1F3A2B]"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <a
                                    href={route('password.request')}
                                    tabIndex={5}
                                    className="ml-auto text-xs text-muted-foreground underline-offset-4 hover:text-[#1F3A2B] hover:underline"
                                >
                                    Lupa password?
                                </a>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            className="focus-visible:ring-[#1F3A2B]"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center gap-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            tabIndex={3}
                            checked={data.remember}
                            onCheckedChange={(checked) => setData('remember', checked === true)}
                            className="data-[state=checked]:bg-[#1F3A2B] data-[state=checked]:border-[#1F3A2B]"
                        />
                        <Label htmlFor="remember" className="cursor-pointer font-normal text-muted-foreground">
                            Ingat saya di perangkat ini
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        tabIndex={4}
                        disabled={processing}
                        className="mt-1 w-full bg-[#1F3A2B] text-white hover:bg-[#162d20] focus-visible:ring-[#1F3A2B]"
                    >
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        {processing ? 'Memproses...' : 'Masuk'}
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
