import { CardField } from '@components/cardField';
import { RatedPagination } from '@components/pagination/ratedPagination';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { AppLayout } from '@pages/layout';
import { MovieItem, StoragedItem } from '@redux/appTypes';
import { appModal } from '@redux/reducers/appSlice';
import { FC, useEffect, useState } from 'react';

export const RatedMoviesPage: FC = () => {
    // const chosenMovie = useAppSelector(appModal);
    // const storagedRated = localStorage.getItem('rated');
    // const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];
    // const movieList: MovieItem[] = ratedMovies.map((item) => item.movie);
    // const [isRatedList, seIsRatedList] = useState(Boolean(movieList.length > 0));
    // useEffect(() => {
    //     const storagedRated = localStorage.getItem('rated');
    //     const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];
    //     const movieList: MovieItem[] = ratedMovies.map((item) => item.movie);
    //     seIsRatedList(Boolean(movieList.length > 0));
    // }, [chosenMovie]);

    return (
        <AppLayout>
            {/* {isRatedList && <CardField movies={movieList} />} */}
            <RatedPagination />
        </AppLayout>
    );
};
