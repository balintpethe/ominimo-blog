export type * from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
};

export interface Role {
    id: number;
    name: string;
    slug: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles?: Role[];
}

export interface Comment {
    id: number;
    post_id: number;
    user_id: number | null;
    user?: User;
    comment: string;
    created_at: string;
}

export interface Post {
    id: number;
    user_id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    user: User;
    comments?: Comment[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
