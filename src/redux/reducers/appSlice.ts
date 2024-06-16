import { SortTypes } from '@constants/enums';
import { AppFilters, MovieItem, StoragedItem } from '@redux/appTypes';
import { ApplicationState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AppState = {
    filters: AppFilters;
    sort_by: string;
    isLoading: boolean;
    movieForModal: StoragedItem | null;
    isFormToched: boolean;
};
export const intialFilters = {
    with_genres: [],
    primary_release_year: '',
    'vote_average.lte': null,
    'vote_average.gte': null,
};

const initialState: AppState = {
    filters: intialFilters,
    sort_by: 'Most Popular',
    isLoading: false,
    movieForModal: null,
    isFormToched: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        setAppModal(state, { payload: movieForModal }: PayloadAction<StoragedItem | null>) {
            state.movieForModal = movieForModal;
        },
        setAppSortBy(state, { payload: sort_by }: PayloadAction<SortTypes>) {
            state.sort_by = sort_by;
        },
        setAppFilters(state, { payload }: PayloadAction<AppFilters>) {
            state.filters = payload;
        },
        setResetFilters(state) {
            state.filters = intialFilters;
        },
        setFormToched(state, { payload: isFormToched }: PayloadAction<boolean>) {
            state.isFormToched = isFormToched;
        },
    },
});

export const appSelector = (state: ApplicationState) => state.app;
export const appIsLoading = (state: ApplicationState) => state.app.isLoading;
export const appFilters = (state: ApplicationState) => state.app.filters;
export const appSortBy = (state: ApplicationState) => state.app.sort_by;
export const appModal = (state: ApplicationState) => state.app.movieForModal;
export const formToched = (state: ApplicationState) => state.app.isFormToched;

export const {
    setAppFilters,
    setAppLoading,
    setAppSortBy,
    setAppModal,
    setResetFilters,
    setFormToched,
} = appSlice.actions;
export default appSlice.reducer;
