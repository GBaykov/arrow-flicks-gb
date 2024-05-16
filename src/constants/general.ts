//deployment for https://github.com/GBaykov/TMDB-api-proxy

export const API_URL = 'https://tmdb-api-proxy.onrender.com';
export const RESERVE_API_URL = 'https://exciting-analysis-production.up.railway.app';

export const IMG_BASE_URL = 'http://image.tmdb.org/t/p/';

export enum ApiEndpoints {
    DISCOVER_MOVIES = 'discover/movie',
    GENRE_LIST = 'genre/movie/list',
    MOVIE_DEAILS = 'movie',
}

export const PATHS = {
    INITIAL: '/',
    MAIN: '/movie',
    RATED_MOVIES: '/rated-movies',
    MOVIE_DETAILS: '/movie/:movieId',
};
