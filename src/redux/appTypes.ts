export type MovieItem = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};
export type MoviesList = MovieItem[];
export type MoviesResponce = {
    page: number;
    results: MoviesList;
    total_pages: number;
    total_results: number;
};

export type GenreType = {
    id: number;
    name: string;
};
export type GenreResponce = {
    genres: GenreType[];
};

export type MovieVideo = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
};

export type MovieDetails = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    };
    budget: number;
    genres: GenreType[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: [
        {
            id: number;
            logo_path: string;
            name: string;
            origin_country: string;
        },
    ];
    production_countries: [
        {
            iso_3166_1: string;
            name: string;
        },
    ];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: [
        {
            english_name: string;
            iso_639_1: string;
            name: string;
        },
    ];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    videos: {
        results: MovieVideo[];
    };
    vote_average: number;
    vote_count: number;
};

export type StoragedItem = {
    movie: MovieItem;
    personalRate: number;
};

export type AppFilters = {
    with_genres: number[];
    primary_release_year: string;
    'vote_average.lte': number | null;
    'vote_average.gte': number | null;
};

export type GetMoviesArgs = Partial<AppFilters> & {
    sort_by?: string;
    page?: number;
    language: 'en-US';
};

export interface Genre {
    value: string;
    label: string;
}

export interface Genres {
    genres: Array<Genre>;
}
