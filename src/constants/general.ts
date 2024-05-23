//deployment for https://github.com/GBaykov/TMDB-api-proxy

import { SortTypes } from './enums';

export const API_URL = 'https://tmdb-api-proxy.onrender.com';
export const RESERVE_API_URL = 'https://exciting-analysis-production.up.railway.app';

export const IMG_BASE_URL = 'http://image.tmdb.org/t/p/';

export const MAX_PAGES_COUNT = 500;

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

export const sortData = [
    { label: 'Most Popular', name: SortTypes.MostPopular },
    { label: 'Least Popular', name: SortTypes.LeastPopular },

    { label: 'Most Rated', name: SortTypes.MostRated },
    { label: 'Least Rated', name: SortTypes.MostRated },

    { label: 'Most Voted', name: SortTypes.MostVoted },
    { label: 'Least Voted', name: SortTypes.LeastVoted },
];
