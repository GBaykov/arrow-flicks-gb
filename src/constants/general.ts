//deployment for https://github.com/GBaykov/TMDB-api-proxy

export const API_URL = 'https://tmdb-api-proxy.onrender.com';
export const RESERVE_API_URL = 'https://exciting-analysis-production.up.railway.app';

export enum ApiEndpoints {
    DISCOVER_MOVIES = 'discover/movie',
    GENRE_LIST = 'genre/movie/list',
    MOVIE_DEAILS = 'movie',
}

export const PATHS = {
    INITIAL: '/',
    MAIN: '/main',
    RATED_MOVIES: '/tated-movies',
    MOVIE_DETAIL: '/movie-deail',
};
