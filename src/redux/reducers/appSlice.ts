import { ApplicationState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AppFilters = {
    genre_ids: number[];
    year: string;
    rating: {
        from: number;
        to: number;
    };
};

export type AppState = {
    filters: AppFilters;
    sortBy: string;
    isLoading: boolean;
};
const intialFilters = {
    genre_ids: [],
    year: '',
    rating: {
        from: 0,
        to: 10,
    },
};

const initialState: AppState = {
    filters: intialFilters,
    sortBy: '',
    isLoading: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        setAppSortBy(state, { payload: sortBy }: PayloadAction<string>) {
            state.sortBy = sortBy;
        },
        setAppFilters(state, { payload }: PayloadAction<AppFilters>) {
            state.filters = payload;
        },
    },
});

export const appSelector = (state: ApplicationState) => state.app;
export const appIsLoading = (state: ApplicationState) => state.app.isLoading;
export const appFilters = (state: ApplicationState) => state.app.filters;
export const appSortBy = (state: ApplicationState) => state.app.sortBy;

export const { setAppFilters, setAppLoading, setAppSortBy } = appSlice.actions;
export default appSlice.reducer;
