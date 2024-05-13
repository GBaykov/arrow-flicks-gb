import { MovieDetails, MovieList } from '@redux/storeTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type MoviesState = {
    page: number;
    movie_list: MovieList;
    total_pages: number;
    total_results: number;
    movie_details: MovieDetails | null;
};
const initialState: MoviesState = {
    page: 1,
    movie_list: [],
    total_pages: 1,
    total_results: 0,
    movie_details: null,
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setPage(state, { payload: page }: PayloadAction<number>) {
            state.page = page;
        },
        setMovieList(state, { payload: movie_list }: PayloadAction<MovieList>) {
            state.movie_list = movie_list;
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
    },
});

export default moviesSlice.reducer;
