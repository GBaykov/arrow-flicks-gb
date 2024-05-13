import { ApplicationState } from '@redux/configure-store';
import { GenreType, MovieDetails, MoviesList } from '@redux/storeTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type MoviesState = {
    page: number;
    movies_list: MoviesList;
    total_pages: number;
    total_results: number;
    movie_details: MovieDetails | null;
    genre_list: GenreType[];
};
const initialState: MoviesState = {
    page: 1,
    movies_list: [],
    total_pages: 1,
    total_results: 0,
    movie_details: null,
    genre_list: [],
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setPage(state, { payload: page }: PayloadAction<number>) {
            state.page = page;
        },
        setMovieList(state, { payload: movie_list }: PayloadAction<MoviesList>) {
            state.movies_list = movie_list;
        },
        setTotalPages(state, { payload: total_pages }: PayloadAction<number>) {
            state.total_pages = total_pages;
        },
        setTotalResults(state, { payload: total_results }: PayloadAction<number>) {
            state.total_results = total_results;
        },
        setMovieDetails(state, { payload: movie_details }: PayloadAction<MovieDetails>) {
            state.movie_details = movie_details;
        },
        setGenreList(state, { payload: genre_list }: PayloadAction<GenreType[]>) {
            state.genre_list = genre_list;
        },
    },
});

export const moviesSelector = (state: ApplicationState) => state.movies;
export const moviesPage = (state: ApplicationState) => state.movies.page;
export const moviesList = (state: ApplicationState) => state.movies.movies_list;
export const genreList = (state: ApplicationState) => state.movies.genre_list;

export const {
    setPage,
    setMovieList,
    setTotalPages,
    setTotalResults,
    setMovieDetails,
    setGenreList,
} = moviesSlice.actions;

export default moviesSlice.reducer;
