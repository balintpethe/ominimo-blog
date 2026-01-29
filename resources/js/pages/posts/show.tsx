import { Link, Head, useForm, usePage } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import React from 'react';
import type { PageProps, Post, Comment, User } from '@/types';

// --- Dátumformázó ---
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

// --- Avatár Generátor ---
const UserAvatar = ({
    name,
    isGuest = false,
}: {
    name: string;
    isGuest?: boolean;
}) => {
    const initials = isGuest ? '?' : name.substring(0, 2).toUpperCase();
    const bgClass = isGuest
        ? 'bg-gray-200 text-gray-500'
        : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white';

    return (
        <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ${bgClass}`}
        >
            {initials}
        </div>
    );
};

// --- Egyetlen Komment ---
const CommentItem = ({
    comment,
    currentUser,
    postOwnerId,
}: {
    comment: Comment;
    currentUser: User | null;
    postOwnerId: number;
}) => {
    const canDelete =
        currentUser &&
        (currentUser.id === comment.user_id ||
            currentUser.id === postOwnerId ||
            currentUser.roles?.some((role) => role.slug === 'admin'));
    const authorName = comment.user ? comment.user.name : 'Vendég';

    return (
        <div className="group flex gap-4 rounded-xl p-4 transition-colors hover:bg-slate-50">
            <UserAvatar name={authorName} isGuest={!comment.user} />

            <div className="flex-1">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="mr-2 font-semibold text-gray-900">
                            {authorName}
                        </span>
                        {!comment.user && (
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                                Vendég
                            </span>
                        )}
                        <div className="mt-0.5 text-xs text-gray-400">
                            {formatDate(comment.created_at)}
                        </div>
                    </div>

                    {canDelete && (
                        <Link
                            as="button"
                            method="delete"
                            href={`/comments/${comment.id}`}
                            className="text-gray-400 opacity-0 transition-colors group-hover:opacity-100 hover:text-red-500"
                            title="Törlés"
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
                                    strokeWidth={1.5}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </Link>
                    )}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {comment.comment}
                </p>
            </div>
        </div>
    );
};

// --- Komment Űrlap ---
const CommentForm = ({
    postId,
    user,
}: {
    postId: number;
    user: User | null;
}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        comment: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/posts/${postId}/comments`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-6"
        >
            <h4 className="mb-4 text-sm font-bold tracking-wide text-gray-900 uppercase">
                Hozzászólás írása
            </h4>
            <div className="flex gap-4">
                <div className="hidden sm:block">
                    <UserAvatar
                        name={user ? user.name : 'Guest'}
                        isGuest={!user}
                    />
                </div>
                <div className="flex-1">
                    <textarea
                        value={data.comment}
                        onChange={(e) => setData('comment', e.target.value)}
                        className="min-h-[100px] w-full resize-y rounded-xl border-gray-200 shadow-sm transition-all focus:border-blue-500 focus:ring-blue-500"
                        placeholder={
                            user
                                ? 'Oszd meg a véleményed...'
                                : 'Írj hozzászólást vendégként...'
                        }
                    />
                    {errors.comment && (
                        <div className="mt-1 text-sm text-red-500">
                            {errors.comment}
                        </div>
                    )}

                    <div className="mt-3 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing || !data.comment.trim()}
                            className="rounded-xl bg-blue-600 px-6 py-2 font-medium text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Küldés...' : 'Hozzászólás elküldése'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

// --- Show ---
export default function Show({ post }: { post: Post }) {
    const { auth } = usePage<PageProps>().props;
    const isOwner = auth.user && auth.user.id === post.user_id;
    const isAdmin =
        auth.user && auth.user.roles?.some((role) => role.slug === 'admin');

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Head title={post.title} />

            {/* Fejléc / Navigáció */}
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
                    <Link
                        href="/posts"
                        className="group flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
                    >
                        <svg
                            className="mr-1 h-5 w-5 transition-transform group-hover:-translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Vissza a főoldalra
                    </Link>

                    {/* Admin műveletek */}
                    {(isOwner || isAdmin) && (
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/posts/${post.id}/edit`}
                                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-amber-50 hover:text-amber-600"
                                title="Szerkesztés"
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
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </Link>
                            <Link
                                as="button"
                                method="delete"
                                href={`/posts/${post.id}`}
                                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                title="Törlés"
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
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <main className="mx-auto mt-8 max-w-3xl px-4 sm:mt-12 sm:px-6">
                {/* CIKK */}
                <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
                    <div className="p-8 sm:p-12">
                        {/* Cikk Metaadatok */}
                        <div className="mb-8 flex items-center gap-x-4 text-xs">
                            <time
                                dateTime={post.created_at}
                                className="text-gray-500"
                            >
                                {formatDate(post.created_at)}
                            </time>
                            <span className="relative z-10 rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-600">
                                Blog
                            </span>
                        </div>

                        {/* Cím */}
                        <h1 className="mb-8 text-3xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            {post.title}
                        </h1>

                        {/* Szerző */}
                        <div className="mb-10 flex items-center gap-3 border-b border-gray-100 pb-10">
                            <UserAvatar name={post.user.name} />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    {post.user.name}
                                </p>
                                <p className="text-xs text-gray-500">Szerző</p>
                            </div>
                        </div>

                        {/* Tartalom */}
                        <div className="prose prose-lg prose-slate max-w-none leading-relaxed whitespace-pre-line text-gray-700">
                            {post.content}
                        </div>
                    </div>
                </article>

                {/* KOMMENT SZEKCIÓ */}
                <section className="mt-12">
                    <div className="mb-8 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-800">
                            Hozzászólások{' '}
                            <span className="ml-1 font-normal text-gray-400">
                                ({post.comments?.length || 0})
                            </span>
                        </h3>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:p-8">
                        {/* Komment Lista */}
                        <div className="space-y-6">
                            {!post.comments || post.comments.length === 0 ? (
                                <div className="py-10 text-center text-gray-400">
                                    <p className="italic">
                                        Még senki nem szólt hozzá. Légy te az
                                        első!
                                    </p>
                                </div>
                            ) : (
                                post.comments.map((comment) => (
                                    <CommentItem
                                        key={comment.id}
                                        comment={comment}
                                        currentUser={auth.user}
                                        postOwnerId={post.user_id}
                                    />
                                ))
                            )}
                        </div>

                        {/* Új komment írása */}
                        <CommentForm postId={post.id} user={auth.user} />
                    </div>
                </section>
            </main>
        </div>
    );
}
