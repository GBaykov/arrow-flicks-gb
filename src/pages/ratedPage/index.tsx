import { RatedPagination } from '@components/pagination/ratedPagination';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Button, Group, SimpleGrid, TextInput, Title, useMantineTheme } from '@mantine/core';
import { AppLayout } from '@pages/layout';
import { MovieItem, StoragedItem } from '@redux/appTypes';
import { appModal } from '@redux/reducers/appSlice';
import { FC, useEffect, useState } from 'react';
import searchIcon from '../../assets/icons/search.svg';
import classes from './RatedPage.module.css';
import { EmptyStateMessage } from '@components/emptyStateMessage';
import { EmptyData } from '@constants/empty';
import button_classes from '../../modules.styles/Button.module.css';
import { FilmCard } from '@components/card';
import { AppPagination } from '@components/pagination/AppPagination';
import { MAX_CARDS_PER_RATEDPAGE } from '@constants/general';
import { SearchField } from '@components/SearchField';

function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
        return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
}

export const RatedMoviesPage: FC = () => {
    const theme = useMantineTheme();
    const [value, setValue] = useState('');
    // const chosenMovie = useAppSelector(appModal);

    const storagedRated = localStorage.getItem('rated');
    const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];

    const movieList: (MovieItem | any)[] = ratedMovies.map((item) => item.movie_info) || [];
    const [isRatedList, seIsRatedList] = useState(Boolean(movieList?.length > 0));
    const [ratedSearchedMovies, setRatedSearchedMovies] = useState(movieList);

    const [activePage, setActivePage] = useState(1);
    const totalPages = Math.ceil(ratedSearchedMovies.length / MAX_CARDS_PER_RATEDPAGE);

    const ratedData = chunk(ratedSearchedMovies, MAX_CARDS_PER_RATEDPAGE);
    const itemsONPage = ratedData[activePage - 1];

    const setPage = (page: number) => {
        setActivePage(page);
    };

    const submitHandler = () => {
        const result = movieList.filter((movie) =>
            movie?.original_title.toLowerCase().includes(value.toLowerCase()),
        );
        setRatedSearchedMovies(result);

        setActivePage(1);
    };

    useEffect(() => {
        const chosenMovies = movieList.filter((movie) =>
            movie?.original_title.toLowerCase().includes(value.toLowerCase()),
        );
        setRatedSearchedMovies(chosenMovies);
        seIsRatedList(Boolean(movieList.length > 0));
    }, [movieList.length]);

    useEffect(() => {
        if (activePage > totalPages) {
            setActivePage(totalPages);
        }
    }, [totalPages]);

    return (
        <AppLayout>
            {!isRatedList && <EmptyStateMessage info={EmptyData.emty} />}
            {isRatedList && (
                <>
                    {' '}
                    <Group justify={'space-between'} mb={{ base: 20, sm: 40 }} align={'baseline'}>
                        {' '}
                        <Title order={1}>Rated movies</Title>
                        <SearchField
                            value={value}
                            setValue={setValue}
                            onSearchSubmit={submitHandler}
                        />
                        {/* <TextInput
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
                        /> */}
                    </Group>
                    {!ratedSearchedMovies.length ? (
                        <EmptyStateMessage info={EmptyData.data_not_found} />
                    ) : (
                        <>
                            <SimpleGrid cols={{ base: 1, xs: 2 }}>
                                {itemsONPage &&
                                    itemsONPage.map((item) => {
                                        return <FilmCard key={item?.id} movie_info={item} />;
                                    })}
                            </SimpleGrid>{' '}
                            <AppPagination
                                page={activePage}
                                setPage={setPage}
                                align='center'
                                totalPages={Math.min(totalPages, 500)}
                            />
                        </>
                    )}
                </>
            )}
        </AppLayout>
    );
};
