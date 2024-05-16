import { CardField } from '@components/cardField';
import { PATHS } from '@constants/general';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { AppLayout } from '@pages/layout';
import { FC } from 'react';
import { push } from 'redux-first-history';

export const MainPage: FC = () => {
    const dispatch = useAppDispatch();
    dispatch(push(PATHS.MAIN));
    return (
        <AppLayout>
            <CardField />
        </AppLayout>
    );
};
