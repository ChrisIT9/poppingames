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

export interface Developer {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export interface Publisher {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export type DetailedGameResponse = GameResponse & {
    name_original: string;
    description: string;
    metacritic_platforms: any[];
    background_image_additional: string;
    website: string;
    screenshots_count: number;
    movies_count: number;
    creators_count: number;
    achievements_count: number;
    parent_achievements_count: number;
    reddit_url: string;
    reddit_name: string;
    reddit_description: string;
    reddit_logo: string;
    reddit_count: number;
    twitch_count: number;
    youtube_count: number;
    reviews_text_count: number;
    ratings_count: number;
    suggestions_count: number;
    alternative_names: string[];
    metacritic_url: string;
    parents_count: number;
    additions_count: number;
    game_series_count: number;
    developers: Developer[];
    publishers: Publisher[];
    description_raw: string;
}

export interface Screenshot {
    id: number;
    image: string;
    width: number;
    height: number;
    is_deleted: boolean;
}

export interface ScreenshotResponse {
    count: number;
    next?: any;
    previous?: any;
    results: Screenshot[];
}

export interface Review {
    gameId: string,
    reviewedBy: string,
    rating: number,
    reviewContent: string,
    time: Date
}

export interface ReviewsResponse {
    reviews: Review[],
    average: number
}

export interface BackendResponse {
    isLoggedIn: boolean
}

export interface TwitchGame {
    id: string,
    name: string,
    box_art_url: string
}

export interface TwitchGameResponse {
    data: TwitchGame[]
}

export interface Clip {
    id: string;
    url: string;
    embed_url: string;
    broadcaster_id: string;
    broadcaster_name: string;
    creator_id: string;
    creator_name: string;
    video_id: string;
    game_id: string;
    language: string;
    title: string;
    view_count: number;
    created_at: Date;
    thumbnail_url: string;
    duration: number;
}

export interface TwitchClipResponse {
    data: Clip[]
}