import { CardField } from '@components/cardField';
import { MoviesFilters } from '@components/filters';
import { PATHS } from '@constants/general';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { Title } from '@mantine/core';
import { AppLayout } from '@pages/layout';

import { FC } from 'react';
import { push } from 'redux-first-history';

export const MainPage: FC = () => {
    const dispatch = useAppDispatch();
    dispatch(push(PATHS.MAIN));

    return (
        <AppLayout>
            <Title order={1} mb={{ base: 20, sm: 40 }}>
                Movies
            </Title>

            <MoviesFilters />

            <CardField />
        </AppLayout>
    );
};
