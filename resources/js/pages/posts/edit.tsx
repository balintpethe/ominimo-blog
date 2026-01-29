import { useForm, Link } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import React from 'react';
import type { PageProps, Post } from '@/types';

interface EditProps extends PageProps {
    post: Post;
}

export default function Edit({ post }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/posts/${post.id}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                {/* Fejléc és Vissza gomb */}
                <div className="mb-8 px-4 sm:px-0">
                    <Link
                        href={`/posts/${post.id}`}
                        className="mb-4 inline-flex items-center text-sm text-gray-500 transition-colors hover:text-blue-600"
                    >
                        <svg
                            className="mr-1 h-4 w-4"
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
                        Mégse, vissza a bejegyzéshez
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Bejegyzés szerkesztése
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Itt módosíthatod a címet és a tartalmat. A változtatások
                        mentés után azonnal életbe lépnek.
                    </p>
                </div>

                {/* Fő Űrlap Kártya */}
                <div className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-2xl">
                    <div className="p-6 sm:p-10">
                        <form onSubmit={submit} className="space-y-8">
                            {/* Cím Mező */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="mb-2 block text-sm font-semibold text-gray-900"
                                >
                                    Bejegyzés címe
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className="block w-full rounded-xl border-gray-200 px-4 py-3 shadow-sm transition-all focus:border-blue-500 focus:ring-blue-500 sm:text-lg"
                                    placeholder="Pl.: Hogyan kezdjünk bele a React fejlesztésbe..."
                                />
                                {errors.title && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg
                                            className="mr-1 h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Tartalom Mező */}
                            <div>
                                <label
                                    htmlFor="content"
                                    className="mb-2 block text-sm font-semibold text-gray-900"
                                >
                                    Tartalom
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) =>
                                            setData('content', e.target.value)
                                        }
                                        rows={12}
                                        className="block min-h-[200px] w-full resize-y rounded-xl border-gray-200 px-4 py-3 shadow-sm transition-all focus:border-blue-500 focus:ring-blue-500 sm:text-base"
                                        placeholder="Írd ide a történeted..."
                                    />
                                </div>
                                {errors.content && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg
                                            className="mr-1 h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        {errors.content}
                                    </p>
                                )}
                            </div>

                            {/* Műveleti Gombok */}
                            <div className="flex items-center justify-end gap-4 border-t border-gray-100 pt-6">
                                <Link
                                    href={`/posts/${post.id}`}
                                    className="px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
                                >
                                    Mégse
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
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
                                            Mentés...
                                        </>
                                    ) : (
                                        'Változtatások mentése'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
