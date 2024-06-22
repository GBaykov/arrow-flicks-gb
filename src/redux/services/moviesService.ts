import { API_URL, ApiEndpoints } from '@constants/general';
import { setMovieDetails, setMovieList } from '@redux/reducers/moviesSlice';
import { GenreResponce, GenreType, Genres, MovieDetails, MoviesResponce } from '@redux/appTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FiltersState } from '@redux/reducers/filtersSlice';
import { paramsConstructor } from '@components/utils';

export const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
};

export const moviesAPI = createApi({
    reducerPath: 'moviesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    tagTypes: ['Movies'],

    endpoints: (builder) => ({
        getGenreList: builder.query<Genres, void>({
            query: () => ApiEndpoints.GENRE_LIST,
            transformResponse: (response: GenreResponce) => {
                const genres =
                    response.genres?.map(({ id, name }: GenreType) => ({
                        value: id.toString(),
                        label: name,
                    })) || [];

                return { genres };
            },
        }),
        getMovies: builder.query<MoviesResponce, FiltersState>({
            query: ({
                selectedGenres,
                selectedYear,
                ratingFrom,
                ratingTo,
                sortBy,
                page = 1,
            }: FiltersState) => {
                const args = paramsConstructor({
                    selectedGenres,
                    selectedYear,
                    ratingFrom,
                    ratingTo,
                    sortBy,
                    page,
                });
                return {
                    url: ApiEndpoints.DISCOVER_MOVIES,

                    method: 'GET',
                    headers,
                    params: args,
                };
            },

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

                dispatch(setMovieList(data.results));
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
                const { data } = await queryFulfilled;

                dispatch(setMovieDetails(data));
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
