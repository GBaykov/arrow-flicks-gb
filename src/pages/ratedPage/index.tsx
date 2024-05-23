import { CardField } from '@components/cardField';
import { RatedPagination } from '@components/pagination/ratedPagination';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Button, Group, TextInput, Title, useMantineTheme } from '@mantine/core';
import { AppLayout } from '@pages/layout';
import { MovieItem, StoragedItem } from '@redux/appTypes';
import { appModal } from '@redux/reducers/appSlice';
import { FC, useEffect, useState } from 'react';
import searchIcon from '../../assets/icons/search.svg';
import classes from './RatedPage.module.css';

export const RatedMoviesPage: FC = () => {
    const theme = useMantineTheme();
    const [value, setValue] = useState('');
    const chosenMovie = useAppSelector(appModal);

    const storagedRated = localStorage.getItem('rated');
    const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];

    const movieList: MovieItem[] = ratedMovies.map((item) => item.movie);
    const [isRatedList, seIsRatedList] = useState(Boolean(movieList?.length > 0));
    const [ratedSearchedMovies, setRatedSearchedMovies] = useState(movieList);

    const submitHandler = () => {
        const result = movieList.filter((movie) =>
            movie.original_title.toLowerCase().includes(value.toLowerCase()),
        );
        setRatedSearchedMovies(result);
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
            <Group justify={'space-between'}>
                {' '}
                <Title order={1}>Rated movies</Title>
                <TextInput
                    onSubmit={submitHandler}
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    classNames={{ section: classes.section, input: classes.input }}
                    bg={theme.colors.gray[0]}
                    radius={'sm'}
                    // style={{backgroundColor: theme.colors.gray[0]}}
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
            <RatedPagination movieList={ratedSearchedMovies} search={value} />
        </AppLayout>
    );
};
