import { CardField } from '@components/cardField';
import { EmptyStateMessage } from '@components/emptyStateMessage';
import { MoviesForm } from '@components/moviesForm';
import { AppPagination } from '@components/pagination/AppPagination';
import { EmptyData } from '@constants/empty';
import { MAX_CARDS_PER_PAGE, MAX_PAGES_COUNT, PATHS } from '@constants/general';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Title } from '@mantine/core';
import { AppLayout } from '@pages/layout';
import { moviesList, moviesTotalPages } from '@redux/reducers/moviesSlice';
import { FC } from 'react';
import { push } from 'redux-first-history';

export const MainPage: FC = () => {
    const dispatch = useAppDispatch();
    dispatch(push(PATHS.MAIN));
    const movies = useAppSelector(moviesList);
    const total_pages = useAppSelector(moviesTotalPages);
    const displayed_pages = total_pages < MAX_PAGES_COUNT ? total_pages : MAX_PAGES_COUNT;

    return (
        <AppLayout>
            <Title order={1} mt={'40x'}>
                Movies
            </Title>
            <MoviesForm />
            {!displayed_pages && <EmptyStateMessage info={EmptyData.data_not_found} />}
            {displayed_pages && (
                <>
                    <CardField movies={movies} />

                    {displayed_pages > 1 && <AppPagination pages={total_pages} />}
                </>
            )}
        </AppLayout>
    );
};
