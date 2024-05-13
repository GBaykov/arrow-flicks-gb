import { PATHS } from '@constants/general';
import { ErrorPage } from '@pages/errorPage';
import { MainPage } from '@pages/mainPage';
import { MovieDetailPage } from '@pages/moviePage';
import { RatedMoviesPage } from '@pages/ratedPage';
import { Navigate, Route, Routes } from 'react-router-dom';

export const routes = (
    <Routes>
        <Route path={PATHS.INITIAL} element={<MainPage />} />
        <Route path={PATHS.MAIN} element={<MainPage />} />
        <Route path={PATHS.MOVIE_DETAILS} element={<MovieDetailPage />} />
        <Route path={PATHS.RATED_MOVIES} element={<RatedMoviesPage />} />
        <Route path='/*' element={<ErrorPage />} />
    </Routes>
);
