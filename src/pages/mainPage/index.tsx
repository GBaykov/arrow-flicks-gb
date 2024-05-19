import { CardField } from '@components/cardField';
import { PATHS } from '@constants/general';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { AppLayout } from '@pages/layout';
import { moviesList } from '@redux/reducers/moviesSlice';
import { FC } from 'react';
import { push } from 'redux-first-history';

export const MainPage: FC = () => {
    const dispatch = useAppDispatch();
    dispatch(push(PATHS.MAIN));
    const movies = useAppSelector(moviesList);
    return (
        <AppLayout>
            <CardField movies={movies} />
        </AppLayout>
    );
};
