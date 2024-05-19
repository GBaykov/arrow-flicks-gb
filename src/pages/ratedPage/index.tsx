import { CardField } from '@components/cardField';
import { AppLayout } from '@pages/layout';
import { MovieItem, StoragedItem } from '@redux/appTypes';
import { FC } from 'react';

export const RatedMoviesPage: FC = () => {
    const storagedRated = localStorage.getItem('rated');
    const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];
    const movieList: MovieItem[] = ratedMovies.map((item) => item.movie);
    return <AppLayout>{movieList.length > 0 && <CardField movies={movieList} />}</AppLayout>;
};
