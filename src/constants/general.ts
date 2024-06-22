//deployment for https://github.com/GBaykov/TMDB-api-proxy
export const API_URL = 'https://tmdb-api-proxy.onrender.com';
export const RESERVE_API_URL = 'https://exciting-analysis-production.up.railway.app';

export const IMG_BASE_URL = 'http://image.tmdb.org/t/p/';

export const MAX_PAGES_COUNT = 500;
export const MAX_CARDS_PER_PAGE = 20;
export const MAX_CARDS_PER_RATEDPAGE = 4;

export const MAX_RATING = 10;
export const MIN_RATING = 0;

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
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'vote_average.desc', label: 'Most Rated' },
    { value: 'vote_average.asc', label: 'Least Rated' },
    { value: 'vote_count.desc', label: 'Most Voted' },
    { value: 'vote_count.asc', label: 'Least Voted' },
] as const;
export const DEFAULT_SORT_OPTION = sortData[0].value;
