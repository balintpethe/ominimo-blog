import { Link, Head, usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Welcome" />

            <div className="relative min-h-screen overflow-hidden bg-slate-50 selection:bg-blue-500 selection:text-white">
                {/* Háttérdekoráció */}
                <div className="pointer-events-none absolute top-0 left-1/2 h-full w-full max-w-7xl -translate-x-1/2">
                    <div className="animate-blob absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-100 opacity-70 mix-blend-multiply blur-3xl filter"></div>
                    <div className="animate-blob animation-delay-2000 absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-indigo-100 opacity-70 mix-blend-multiply blur-3xl filter"></div>
                </div>

                {/* Navbar / Fejléc */}
                <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-blue-600 p-2 text-white shadow-lg shadow-blue-500/30">
                            <svg
                                className="h-6 w-6"
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
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-800">
                            Ominimo
                        </span>
                    </div>

                    <nav className="flex gap-4">
                        {auth.user ? (
                            <Link
                                href="/posts"
                                className="font-semibold text-slate-600 transition-colors hover:text-blue-600"
                            >
                                Tovább a Blogra &rarr;
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 font-medium text-slate-600 transition-colors hover:text-slate-900"
                                >
                                    Bejelentkezés
                                </Link>
                                {canRegister && (
                                    <Link
                                        href="/register"
                                        className="rounded-full bg-slate-900 px-5 py-2 font-medium text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg"
                                    >
                                        Regisztráció
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Szekció */}
                <main className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
                    <span className="mb-6 inline-block rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
                        👋 Üdvözöllek a fedélzeten
                    </span>

                    <h1 className="mb-6 max-w-4xl text-5xl leading-tight font-extrabold tracking-tight text-slate-900 md:text-7xl">
                        Oszd meg gondolataidat{' '}
                        <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            a nagyvilággal.
                        </span>
                    </h1>

                    <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
                        Az Ominimo Blog egy modern platform, ahol szabadon
                        írhatsz, olvashatsz és kapcsolódhatsz másokhoz.
                        Nincsenek reklámok, csak tiszta tartalom.
                    </p>

                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                        <Link
                            href="/posts"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 hover:bg-blue-700"
                        >
                            Bejegyzések böngészése
                        </Link>

                        {!auth.user && canRegister && (
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-lg font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                            >
                                Fiók létrehozása
                            </Link>
                        )}
                    </div>

                    {/* Statisztika */}
                    <div className="mt-16 flex w-full max-w-md justify-between border-t border-slate-200 pt-8 text-center">
                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                100+
                            </div>
                            <div className="text-sm text-slate-500">
                                Bejegyzés
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                Aktív
                            </div>
                            <div className="text-sm text-slate-500">
                                Közösség
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                0%
                            </div>
                            <div className="text-sm text-slate-500">Reklám</div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="absolute bottom-4 w-full text-center text-sm text-slate-400">
                    &copy; {new Date().getFullYear()} Ominimo Blog. Minden jog
                    fenntartva.
                </footer>
            </div>
        </>
    );
}
