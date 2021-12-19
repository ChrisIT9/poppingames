export interface PlatformDetail {    
    id: number;
    name: string;
    slug: string;
    image: string | null;
    year_end: number | null;
    year_start: number | null;
    games_count: number;
    image_background: string;
}

export interface Platform {
    platform: PlatformDetail;
    released_at: string;
    requirements_en: null | string;
    requirements_ru: null | string;
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export interface StoreDetail {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
}

export interface Store {
    id: number;
    store: StoreDetail
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
}

export interface EsrbRating {
    id: number;
    name: string;
    slug: string;
}

export interface ShortScreenshot {
    id: number;
    image: string;
}

export interface ParentPlatform {
    platform: {
        id: number,
        name: string,
        slug: string
    }
}

export interface GameResponse {
    id: number;
    slug: string;
    name: string;
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    added: number;
    metacritic: number;
    playtime: number;
    suggestions_count: number;
    updated: Date;
    saturated_color: string;
    dominant_color: string;
    platforms: Platform[];
    parent_platforms: ParentPlatform[],
    genres: Genre[];
    stores: Store[];
    clip: string | null;
    tags: Tag[];
    esrb_rating: EsrbRating;
    short_screenshots: ShortScreenshot[];
}

export interface Response<T> {
    count: number,
    next: string | null,
    previous: string | null,
    results: T[]
}

export interface RegisterResponse {
    username: string
}

export interface LoginResponse {
    message: string,
    username: string,
    isAdmin: boolean,
    userId: string
}