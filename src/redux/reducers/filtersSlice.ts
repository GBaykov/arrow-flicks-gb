import { DEFAULT_SORT_OPTION, MAX_RATING, sortData } from '@constants/general';
import { ApplicationState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FiltersState = {
    selectedGenres: Array<string>;
    selectedYear: string | null;
    ratingFrom: number | undefined;
    ratingTo: number | undefined;
    sortBy: (typeof sortData)[number]['value'];
    page: number;
};

const initialState: FiltersState = {
    selectedGenres: [],
    selectedYear: null,
    ratingFrom: undefined,
    ratingTo: undefined,
    sortBy: DEFAULT_SORT_OPTION,
    page: 1,
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setGenres: (state, action: PayloadAction<Array<string>>) => {
            state.selectedGenres = action.payload;
            state.page = 1;
        },
        setReleaseYear: (state, action: PayloadAction<string | null>) => {
            state.selectedYear = action.payload;
            state.page = 1;
        },
        setRatingFrom: (state, action: PayloadAction<number | undefined>) => {
            state.page = 1;
            state.ratingFrom = action.payload;

            if (
                action.payload !== undefined &&
                state.ratingTo !== undefined &&
                action.payload > state.ratingTo
            ) {
                state.ratingTo = action.payload;
            }
        },
        incrementRatingFrom: (state) => {
            state.page = 1;
            if (state.ratingFrom === undefined) {
                state.ratingFrom = 0;
                return;
            }
            if (state.ratingFrom < MAX_RATING) {
                state.ratingFrom += 1;
            }
            if (state.ratingTo !== undefined && state.ratingFrom > state.ratingTo) {
                state.ratingTo = state.ratingFrom;
            }
        },
        decrementRatingFrom: (state) => {
            state.page = 1;
            if (state.ratingFrom === undefined) {
                return;
            }
            if (state.ratingFrom === 0) {
                state.ratingFrom = undefined;
                return;
            }
            state.ratingFrom -= 1;
        },
        setRatingTo: (state, action: PayloadAction<number | undefined>) => {
            state.page = 1;
            state.ratingTo = action.payload;

            if (
                state.ratingFrom !== undefined &&
                action.payload !== undefined &&
                action.payload < state.ratingFrom
            ) {
                state.ratingFrom = action.payload;
            }
        },
        incrementRatingTo: (state) => {
            state.page = 1;
            if (state.ratingTo === undefined) {
                state.ratingTo = Math.max(0, state.ratingFrom ?? 0);
                return;
            }
            if (state.ratingTo < MAX_RATING) {
                state.ratingTo += 1;
            }
        },
        decrementRatingTo: (state) => {
            state.page = 1;
            if (state.ratingTo === undefined) {
                return;
            }
            if (state.ratingTo === 0) {
                state.ratingTo = undefined;
                return;
            }
            state.ratingTo -= 1;

            if (state.ratingFrom !== undefined && state.ratingTo < state.ratingFrom) {
                state.ratingFrom = state.ratingTo;
            }
        },
        setSortBy: (state, action: PayloadAction<(typeof sortData)[number]['value'] | null>) => {
            state.page = 1;
            state.sortBy = action.payload || DEFAULT_SORT_OPTION;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        resetFilters: (state) => {
            state.selectedGenres = initialState.selectedGenres;
            state.selectedYear = initialState.selectedYear;
            state.ratingFrom = initialState.ratingFrom;
            state.ratingTo = initialState.ratingTo;
            state.page = 1;
        },
    },
});

export const filtersSelector = (state: ApplicationState) => state.filters;
export const filtersGenres = (state: ApplicationState) => state.filters.selectedGenres;
export const filtersRatingFrom = (state: ApplicationState) => state.filters.ratingFrom;
export const filtersRatingTo = (state: ApplicationState) => state.filters.ratingTo;
export const filtersYears = (state: ApplicationState) => state.filters.selectedYear;
export const filtersPage = (state: ApplicationState) => state.filters.page;
export const filtersSortBy = (state: ApplicationState) => state.filters.sortBy;

export const {
    setGenres,
    setReleaseYear,
    setRatingFrom,
    incrementRatingFrom,
    decrementRatingFrom,
    setRatingTo,
    incrementRatingTo,
    decrementRatingTo,
    setSortBy,
    setPage,
    resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
