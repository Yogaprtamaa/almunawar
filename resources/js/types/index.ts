import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    flash: { success?: string; error?: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Program {
    id: number;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    body: string | null;
    schedule: string | null;
    image: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    category: string;
    author: string;
    excerpt: string;
    body: string | null;
    image: string | null;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface GalleryAlbum {
    id: number;
    title: string;
    slug: string;
    cover_image: string | null;
    description: string | null;
    is_published: boolean;
    photos_count?: number;
    photos?: GalleryPhoto[];
    created_at: string;
    updated_at: string;
}

export interface GalleryPhoto {
    id: number;
    gallery_album_id: number;
    image_path: string;
    caption: string | null;
    sort_order: number;
}

export interface Paginator<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    prev_page_url: string | null;
}
