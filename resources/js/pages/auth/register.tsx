import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import React, { useEffect } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, [reset]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
            <Head title="Register" />

            {/* Logo és Címsor */}
            <div className="mb-8 text-center">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 p-3 text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-700"
                >
                    <svg
                        className="h-8 w-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                    </svg>
                </Link>
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                    Fiók létrehozása
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Csatlakozz az Ominimo közösséghez még ma.
                </p>
            </div>

            {/* Regisztrációs Kártya */}
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5">
                <form onSubmit={submit} className="space-y-5">
                    {/* Név */}
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-semibold text-gray-900"
                        >
                            Teljes név
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="block w-full rounded-xl border-gray-200 px-4 py-2.5 shadow-sm transition-all focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            autoComplete="name"
                            autoFocus
                            required
                            placeholder="Kovács János"
                        />
                        {errors.name && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-gray-900"
                        >
                            Email cím
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="block w-full rounded-xl border-gray-200 px-4 py-2.5 shadow-sm transition-all focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            autoComplete="username"
                            required
                            placeholder="pelda@email.com"
                        />
                        {errors.email && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {/* Jelszó */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-gray-900"
                        >
                            Jelszó
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="block w-full rounded-xl border-gray-200 px-4 py-2.5 shadow-sm transition-all focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            autoComplete="new-password"
                            required
                            placeholder="Legalább 8 karakter"
                        />
                        {errors.password && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    {/* Jelszó megerősítése */}
                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="mb-2 block text-sm font-semibold text-gray-900"
                        >
                            Jelszó megerősítése
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            className="block w-full rounded-xl border-gray-200 px-4 py-2.5 shadow-sm transition-all focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            autoComplete="new-password"
                            required
                            placeholder="Jelszó újra"
                        />
                        {errors.password_confirmation && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.password_confirmation}
                            </div>
                        )}
                    </div>

                    {/* Gomb */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full justify-center rounded-xl border border-transparent bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                        >
                            {processing
                                ? 'Fiók létrehozása...'
                                : 'Regisztráció'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Váltás bejelentkezésre */}
            <p className="mt-8 text-center text-sm text-gray-600">
                Már van felhasználód?{' '}
                <Link
                    href="/login"
                    className="font-semibold text-blue-600 transition-colors hover:text-blue-500"
                >
                    Jelentkezz be itt
                </Link>
            </p>
        </div>
    );
}
