import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StoragedItem } from '../appTypes';
import { ApplicationState } from '../configure-store';

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
