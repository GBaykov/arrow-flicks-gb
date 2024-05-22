import { SortTypes } from '@constants/enums';
import { AppFilters, MovieItem } from '@redux/appTypes';
import { ApplicationState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AppState = {
    filters: AppFilters;
    sort_by: SortTypes;
    isLoading: boolean;
    movieForModal: MovieItem | null;
};
const intialFilters = {
    with_genres: [],
    primary_release_year: '',
    'vote_average.lte': null,
    'vote_average.gte': null,
};

const initialState: AppState = {
    filters: intialFilters,
    sort_by: SortTypes.MostPopular,
    isLoading: false,
    movieForModal: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        setAppModal(state, { payload: movieForModal }: PayloadAction<MovieItem | null>) {
            state.movieForModal = movieForModal;
        },
        setAppSortBy(state, { payload: sort_by }: PayloadAction<SortTypes>) {
            state.sort_by = sort_by;
        },
        setAppFilters(state, { payload }: PayloadAction<AppFilters>) {
            state.filters = payload;
        },
    },
});

export const appSelector = (state: ApplicationState) => state.app;
export const appIsLoading = (state: ApplicationState) => state.app.isLoading;
export const appFilters = (state: ApplicationState) => state.app.filters;
export const appSortBy = (state: ApplicationState) => state.app.sort_by;
export const appModal = (state: ApplicationState) => state.app.movieForModal;

export const { setAppFilters, setAppLoading, setAppSortBy, setAppModal } = appSlice.actions;
export default appSlice.reducer;
