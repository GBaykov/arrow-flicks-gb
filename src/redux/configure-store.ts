import { combineReducers, configureStore } from "@reduxjs/toolkit";

import appReducer, { AppState, appSlice } from "./reducers/appSlice";
import moviesReducer, {
  MoviesState,
  moviesSlice,
} from "./reducers/moviesSlice";
import filtersReducer, {
  FiltersState,
  filtersSlice,
} from "./reducers/filtersSlice";
import { moviesAPI } from "./services/moviesService";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  [appSlice.name]: appReducer,
  [moviesSlice.name]: moviesReducer,
  [filtersSlice.name]: filtersReducer,
  [moviesAPI.reducerPath]: moviesAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(moviesAPI.middleware),
});

export type ApplicationState = Readonly<{
  [appSlice.name]: AppState;
  [moviesSlice.name]: MoviesState;
  [filtersSlice.name]: FiltersState;
}>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
