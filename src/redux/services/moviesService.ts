import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { paramsConstructor } from "@/components/utils";
import {
  GenreResponce,
  GenreType,
  Genres,
  MovieDetails,
  MoviesResponce,
} from "../appTypes";
import { API_BASE_URL, API_ROUTES } from "@/constants/app";
import { FiltersState } from "../reducers/filtersSlice";
import { setMovieDetails, setMovieList } from "../reducers/moviesSlice";

export const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
};

export const moviesAPI = createApi({
  reducerPath: "moviesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),

  endpoints: (builder) => ({
    getGenreList: builder.query<Genres, void>({
      query: () => API_ROUTES.GENRES,
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
          url: API_ROUTES.MOVIES,

          method: "GET",
          headers,
          params: args,
        };
      },

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(setMovieList(data.results));
      },
    }),
    getMovieDetails: builder.query<MovieDetails, string>({
      query: (id) => ({
        url: `${API_ROUTES.MOVIES}/${id}?append_to_response=videos`,
        method: "GET",
        headers,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(setMovieDetails(data));
      },
    }),
  }),
});

export const {
  useGetGenreListQuery,
  useGetMoviesQuery,
  useGetMovieDetailsQuery,
} = moviesAPI;
