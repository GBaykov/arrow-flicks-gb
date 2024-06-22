import { ApplicationState } from '@redux/configure-store';
import { GenreType, MovieDetails, MoviesList } from '@redux/appTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type MoviesState = {
    movies_list: MoviesList;
    movie_details: MovieDetails | null;
    genre_list: GenreType[];
};
const initialState: MoviesState = {
    movies_list: [],
    movie_details: null,
    genre_list: [],
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovieList(state, { payload: movie_list }: PayloadAction<MoviesList>) {
            state.movies_list = movie_list;
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
export const moviesList = (state: ApplicationState) => state.movies.movies_list;
export const genreList = (state: ApplicationState) => state.movies.genre_list;
export const movieDetails = (state: ApplicationState) => state.movies.movie_details;

export const { setMovieList, setMovieDetails, setGenreList } = moviesSlice.actions;

export default moviesSlice.reducer;
