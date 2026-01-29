import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import React, { useEffect } from 'react';

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, [reset]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
            <Head title="Bejelentkezés" />

            {/* Logo és Fejléc */}
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
                    Üdvözlünk újra!
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Jelentkezz be a folytatáshoz.
                </p>
            </div>

            {/* Fő Kártya */}
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5">
                {/* Státusz üzenet */}
                {status && (
                    <div className="mb-6 rounded-lg border border-green-100 bg-green-50 p-3 text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    {/* Email Mező */}
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
                            autoFocus
                            placeholder="pelda@email.com"
                        />
                        {errors.email && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {/* Jelszó Mező */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-900"
                            >
                                Jelszó
                            </label>
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="block w-full rounded-xl border-gray-200 px-4 py-2.5 shadow-sm transition-all focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            autoComplete="current-password"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    {/* Emlékezz rám (Checkbox) */}
                    <div className="block">
                        <label className="group flex cursor-pointer items-center">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                    className="peer h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                            </div>
                            <span className="ml-2 text-sm text-gray-600 transition-colors group-hover:text-gray-900">
                                Maradjak bejelentkezve
                            </span>
                        </label>
                    </div>

                    {/* Submit Gomb */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex w-full justify-center rounded-xl border border-transparent bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? (
                            <div className="flex items-center">
                                <svg
                                    className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Bejelentkezés...
                            </div>
                        ) : (
                            'Bejelentkezés'
                        )}
                    </button>
                </form>
            </div>

            {/* Váltás regisztrációra */}
            <p className="mt-8 text-center text-sm text-gray-600">
                Nincs még fiókod?{' '}
                <Link
                    href="/register"
                    className="font-semibold text-blue-600 transition-colors hover:text-blue-500"
                >
                    Regisztrálj ingyen
                </Link>
            </p>
        </div>
    );
}
