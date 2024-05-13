import { API_URL, ApiEndpoints } from '@constants/general';
import { setAppLoading } from '@redux/reducers/appSlice';
import {
    setGenreList,
    setMovieDetails,
    setMovieList,
    setPage,
    setTotalPages,
    setTotalResults,
} from '@redux/reducers/moviesSlice';
import { GenreType, MovieDetails, MoviesResponce } from '@redux/storeTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moviesAPI = createApi({
    reducerPath: 'moviesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    tagTypes: ['Movies', 'GenreList'],

    endpoints: (builder) => ({
        getGenreList: builder.query<GenreType[], void>({
            query: () => ({
                url: ApiEndpoints.GENRE_LIST,
                method: 'GET',
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setAppLoading(false));
                    dispatch(setGenreList(data));
                } catch {
                    dispatch(setAppLoading(false));
                }
            },
            providesTags: ['GenreList'],
        }),
        getMovies: builder.query<MoviesResponce, void>({
            query: () => ({
                url: ApiEndpoints.DISCOVER_MOVIES,
                method: 'GET',
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setAppLoading(false));

                    dispatch(setMovieList(data.movies));
                    dispatch(setPage(data.page));
                    dispatch(setTotalPages(data.total_pages));
                    dispatch(setTotalResults(data.total_results));
                } catch {
                    dispatch(setAppLoading(false));
                }
            },
            providesTags: ['Movies'],
        }),
        getMovieDetails: builder.query<MovieDetails, void>({
            query: () => ({
                url: ApiEndpoints.MOVIE_DEAILS,
                method: 'GET',
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setAppLoading(false));
                    dispatch(setMovieDetails(data));
                } catch {
                    dispatch(setAppLoading(false));
                }
            },
            providesTags: ['Movies'],
        }),
    }),
});

export const { useGetGenreListQuery, useLazyGetMoviesQuery, useLazyGetMovieDetailsQuery } =
    moviesAPI;
