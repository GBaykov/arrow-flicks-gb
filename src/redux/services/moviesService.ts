import { API_URL, ApiEndpoints } from '@constants/general';
import { setAppLoading } from '@redux/reducers/appSlice';
import {
    setGenreList,
    setMovieDetails,
    setMovieList,
    setMoviesResponce,
    setPage,
    setTotalPages,
    setTotalResults,
} from '@redux/reducers/moviesSlice';
import { GenreResponce, MovieDetails, MoviesResponce } from '@redux/storeTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
};

export const moviesAPI = createApi({
    reducerPath: 'moviesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    tagTypes: ['Movies', 'GenreList'],

    endpoints: (builder) => ({
        getGenreList: builder.query<GenreResponce, void>({
            query: () => ({
                url: ApiEndpoints.GENRE_LIST,
                method: 'GET',
                headers,
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoading(true));
                    const { data } = await queryFulfilled;
                    dispatch(setGenreList(data.genres));
                    dispatch(setAppLoading(false));
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
                headers,
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoading(true));
                    const { data } = await queryFulfilled;

                    console.log(data.results);
                    dispatch(setMoviesResponce(data));
                    dispatch(setMovieList(data.results));
                    dispatch(setPage(data.page));
                    dispatch(setTotalPages(data.total_pages));
                    dispatch(setTotalResults(data.total_results));
                    dispatch(setAppLoading(false));
                } catch {
                    dispatch(setAppLoading(false));
                }
            },
            providesTags: ['Movies'],
        }),
        getMovieDetails: builder.query<MovieDetails, number>({
            query: (id) => ({
                url: `${ApiEndpoints.MOVIE_DEAILS}/${id}?append_to_response=videos`,
                method: 'GET',
                headers,
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setMovieDetails(data));
                    dispatch(setAppLoading(false));
                } catch {
                    dispatch(setAppLoading(false));
                }
            },
            providesTags: ['Movies'],
        }),
    }),
});

export const {
    useGetGenreListQuery,
    useGetMoviesQuery,
    useGetMovieDetailsQuery,
    useLazyGetMoviesQuery,
    useLazyGetMovieDetailsQuery,
} = moviesAPI;
