import { FilmCard } from '@components/card';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { SimpleGrid } from '@mantine/core';
import { MoviesList } from '@redux/appTypes';
import { filtersSelector, setPage } from '@redux/reducers/filtersSlice';
import { useGetMoviesQuery } from '@redux/services/moviesService';
import { FC } from 'react';

export type CardField = {
    movies: MoviesList;
};

export const CardField: FC = () => {
    const { selectedGenres, selectedYear, ratingFrom, ratingTo, sortBy, page } =
        useAppSelector(filtersSelector);

    const dispatch = useAppDispatch();

    const setCurrentPage = (currentPage: number) => {
        dispatch(setPage(currentPage));
    };

    const { data: movies } = useGetMoviesQuery({
        selectedGenres,
        selectedYear,
        ratingFrom,
        ratingTo,
        sortBy,
        page,
    });
    console.log(selectedGenres, selectedYear, ratingFrom, ratingTo, sortBy, page);

    return (
        <SimpleGrid cols={{ base: 1, xs: 2 }}>
            {movies &&
                movies.results.map((item) => {
                    return <FilmCard key={item?.id} movie_info={item} />;
                })}
        </SimpleGrid>
    );
};
