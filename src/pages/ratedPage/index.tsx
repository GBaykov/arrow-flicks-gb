import { CardField } from '@components/cardField';
import { RatedPagination } from '@components/pagination/ratedPagination';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    Button,
    Center,
    Flex,
    Group,
    Stack,
    TextInput,
    Title,
    useMantineTheme,
} from '@mantine/core';
import { AppLayout } from '@pages/layout';
import { MovieItem, StoragedItem } from '@redux/appTypes';
import { appModal } from '@redux/reducers/appSlice';
import { FC, useEffect, useState } from 'react';
import searchIcon from '../../assets/icons/search.svg';
import classes from './RatedPage.module.css';
import { EmptyStateMessage } from '@components/emptyStateMessage';
import { EmptyData } from '@constants/empty';

import button_classes from '../../modules.styles/Button.module.css';

export const RatedMoviesPage: FC = () => {
    const theme = useMantineTheme();
    const [value, setValue] = useState('');
    const chosenMovie = useAppSelector(appModal);

    const storagedRated = localStorage.getItem('rated');
    const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];

    const movieList: MovieItem[] = ratedMovies.map((item) => item.movie);
    const [isRatedList, seIsRatedList] = useState(Boolean(movieList?.length > 0));
    const [ratedSearchedMovies, setRatedSearchedMovies] = useState(movieList);

    const [activePage, setActivePage] = useState(1);

    const setPage = (page: number) => {
        setActivePage(page);
    };

    const submitHandler = () => {
        const result = movieList.filter((movie) =>
            movie.original_title.toLowerCase().includes(value.toLowerCase()),
        );
        setRatedSearchedMovies(result);
        setActivePage(1);
    };

    useEffect(() => {
        const storagedRated = localStorage.getItem('rated');
        const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];
        const movieList: MovieItem[] = ratedMovies.map((item) => item.movie);
        const chosenMovies = movieList.filter((movie) => movie.original_title.includes(value));
        // const result = movieList.filter((movie) => movie.original_title.includes(value));
        // const ratedData = chunk(movies, MAX_CARDS_PER_RATEDPAGE);
        setRatedSearchedMovies(chosenMovies);
        //  const itemsPerPage = ratedData[activePage - 1];
        seIsRatedList(Boolean(movieList.length > 0));
        // seIsRatedList(Boolean(itemsPerPage.length > 0));
    }, [chosenMovie]);

    return (
        <AppLayout>
            {!isRatedList && <EmptyStateMessage info={EmptyData.emty} />}
            {isRatedList && (
                <>
                    {' '}
                    <Group justify={'space-between'} mb={{ base: 20, sm: 40 }} align={'baseline'}>
                        {' '}
                        <Title order={1}>Rated movies</Title>
                        <TextInput
                            onSubmit={submitHandler}
                            value={value}
                            onChange={(event) => setValue(event.currentTarget.value)}
                            classNames={{
                                wrapper: classes.wrapper,
                                section: classes.section,
                                input: classes.input,
                            }}
                            bg={theme.colors.gray[0]}
                            radius={'sm'}
                            style={{ backgroundColor: theme.colors.gray[0], borderRadius: '8px' }}
                            m={'0px'}
                            w={'100%'}
                            h={'48px'}
                            maw={'490px'}
                            p={'8px 12px'}
                            bgsz={'border-box'}
                            leftSection={<img style={{ border: 'none' }} src={searchIcon} />}
                            rightSectionPointerEvents={'auto'}
                            rightSection={
                                <Button
                                    classNames={{
                                        root: button_classes.filledRoot,
                                        section: button_classes.filledSection,
                                        inner: button_classes.filledInner,
                                        label: button_classes.filledLabel,
                                    }}
                                    onClick={submitHandler}
                                    w={'88px'}
                                    p={'6px 20px'}
                                    type='submit'
                                    variant={'filled'}
                                >
                                    Search
                                </Button>
                            }
                            placeholder='Search movie title'
                        />
                    </Group>
                    <RatedPagination
                        movieList={ratedSearchedMovies}
                        setPage={setPage}
                        activePage={activePage}
                    />
                </>
            )}
        </AppLayout>
    );
};
