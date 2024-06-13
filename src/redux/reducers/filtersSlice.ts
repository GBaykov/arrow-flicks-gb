import { ApplicationState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AppFilters = {
    'vote_average.lte': number | null;
    'vote_average.gte': number | null;
};

export type FiltersState = {
    with_genres: number[];
    primary_release_year: string;
    votes_from: number;
    votes_to: number;
    sort_by: string;
    page: number;
};
// export const intialFilters = {
//     with_genres: [],
//     primary_release_year: '',
//     'vote_average.lte': null,
//     'vote_average.gte': null,
// };

const initialState: FiltersState = {
    with_genres: [],
    primary_release_year: '',
    votes_from: 0,
    votes_to: 10,
    sort_by: 'Most Popular',
    page: 1,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setGenres(state, { payload: with_genres }: PayloadAction<number[]>) {
            state.with_genres = with_genres;
            state.page = 1;
        },
        setReleaseYears(state, { payload: primary_release_year }: PayloadAction<string>) {
            state.primary_release_year = primary_release_year;
            state.page = 1;
        },
        setVotesFrom(state, { payload: votes_from }: PayloadAction<number>) {
            state.votes_from = votes_from;
            state.page = 1;
        },
        incrementVotesFrom(state) {
            if (state.votes_from === undefined) {
                state.votes_from = 0;
                return;
            }
            if (state.votes_from < 10) {
                state.votes_from += 1;
            }
            if (state.votes_to !== undefined && state.votes_from > state.votes_to) {
                state.votes_to = state.votes_from;
            }
        },

        setVotesTo(state, { payload: votes_to }: PayloadAction<number>) {
            state.votes_to = votes_to;
            state.page = 1;
        },

        setResetFilters(state) {
            state = initialState;
        },
    },
});

// export const appSelector = (state: ApplicationState) => state.app;
// export const appIsLoading = (state: ApplicationState) => state.app.isLoading;

export const {} = appSlice.actions;
export default appSlice.reducer;
