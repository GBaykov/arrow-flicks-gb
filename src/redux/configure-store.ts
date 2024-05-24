import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { RouterState, createReduxHistoryContext } from 'redux-first-history';
import appReducer, { AppState, appSlice } from './reducers/appSlice';
import moviesReducer, { MoviesState, moviesSlice } from './reducers/moviesSlice';
import { moviesAPI } from './services/moviesService';

const { createReduxHistory, routerReducer, routerMiddleware } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const rootReducer = combineReducers({
    router: routerReducer,
    [appSlice.name]: appReducer,
    [moviesSlice.name]: moviesReducer,
    [moviesAPI.reducerPath]: moviesAPI.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware, moviesAPI.middleware),
});

export const history = createReduxHistory(store);

export type ApplicationState = Readonly<{
    router: RouterState;
    [appSlice.name]: AppState;
    [moviesSlice.name]: MoviesState;
}>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
