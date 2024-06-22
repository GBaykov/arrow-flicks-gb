import { StoragedItem } from '@redux/appTypes';
import { ApplicationState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AppState = {
    movieForModal: StoragedItem | null;
};

const initialState: AppState = {
    movieForModal: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppModal(state, { payload: movieForModal }: PayloadAction<StoragedItem | null>) {
            state.movieForModal = movieForModal;
        },
    },
});

export const appSelector = (state: ApplicationState) => state.app;
export const appModal = (state: ApplicationState) => state.app.movieForModal;
export const { setAppModal } = appSlice.actions;
export default appSlice.reducer;
