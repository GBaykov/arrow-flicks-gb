import { FilmCard } from '@components/card';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { SimpleGrid } from '@mantine/core';
import { moviesList } from '@redux/reducers/moviesSlice';
import { MoviesList } from '@redux/appTypes';
import { FC } from 'react';

export type CardField = {
    movies: MoviesList;
};

export const CardField: FC<CardField> = ({ movies }) => {
    return (
        <SimpleGrid cols={{ base: 1, xs: 2, xxl: 3 }}>
            {movies &&
                movies.map((item) => {
                    return <FilmCard key={item?.id} movie_info={item} />;
                })}
        </SimpleGrid>
    );
};
