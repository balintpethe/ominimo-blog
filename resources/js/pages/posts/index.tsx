import { Link, Head, usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import type { PageProps, Post } from '@/types';

// --- Segédfüggvények ---
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// --- Kisebb Komponensek ---

// Üres állapot komponens
const EmptyState = () => (
    <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-sm">
        <div className="mb-4 text-gray-300">
            <svg
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
            </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">
            Még nincsenek bejegyzések
        </h3>
        <p className="mt-1 text-gray-500">
            Légy te az első, aki megosztja gondolatait!
        </p>
    </div>
);

// Kártya komponens
const PostCard = ({ post }: { post: Post }) => (
    <article className="group relative flex flex-col items-start justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-900/10 sm:p-8">
        <div className="mb-4 flex items-center gap-x-4 text-xs text-gray-500">
            <time
                dateTime={post.created_at}
                className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600"
            >
                {formatDate(post.created_at)}
            </time>
            <span className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-600 transition-colors hover:bg-blue-100">
                Blog
            </span>
        </div>

        <div className="group relative max-w-xl">
            <h3 className="mt-3 text-2xl leading-tight font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                <Link href={`/posts/${post.id}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                </Link>
            </h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {post.content}
            </p>
        </div>

        <div className="relative mt-8 flex w-full items-center gap-x-4 border-t border-gray-100 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-sm">
                {post.user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                    <span className="absolute inset-0" />
                    {post.user.name}
                </p>
                <p className="text-gray-500">Szerző</p>
            </div>
            <a href={`/posts/${post.id}`} className="ml-auto text-sm font-medium text-blue-600 transition-transform group-hover:translate-x-1">
                Olvass tovább &rarr;
            </a>
        </div>
    </article>
);

// --- Fő Komponens ---
export default function Index({ posts }: { posts: Post[] }) {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title="Blog Posts" />

            {/* Fejléc / Header Szekció */}
            <header className="sticky top-0 z-10 border-b border-gray-200 bg-white bg-white/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <a href="/" className="flex items-center gap-3">
                            <div className="rounded-lg bg-blue-600 p-2 text-white">
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
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
                                Ominimo Blog
                            </h1>
                        </a>

                        <div>
                            {auth.user ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                                                <span className="hidden sm:inline">Szia,{' '}</span>
                                                <span className="font-semibold text-gray-900">
                                                    {auth.user.name}
                                                </span>
                                                <ChevronsUpDown className="size-4 opacity-50" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-56 rounded-lg"
                                            >
                                                <UserMenuContent
                                                    user={auth.user}
                                                />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </span>
                                    <Link
                                        href="/posts/create"
                                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        <span className="hidden sm:inline">Új bejegyzés</span>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 sm:gap-4">
                                    <Link
                                        href="/login"
                                        className="px-3 py-2 font-medium text-gray-600 transition-colors hover:text-blue-600"
                                    >
                                        Bejelentkezés
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="rounded-xl bg-gray-900 px-5 py-2.5 font-medium text-white transition-colors hover:bg-gray-800"
                                    >
                                        Regisztráció
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Tartalom Szekció */}
            <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-10 text-center sm:text-left">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Legfrissebb írások
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Olvass bele a legújabb gondolatokba és történetekbe
                        közösségünktől.
                    </p>
                </div>

                <div className="space-y-8">
                    {posts.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid gap-8">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
