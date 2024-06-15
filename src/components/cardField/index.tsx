import { FilmCard } from '@components/card';
import { SimpleGrid } from '@mantine/core';
import { MoviesList } from '@redux/appTypes';
import { FC } from 'react';

export type CardField = {
    movies: MoviesList;
};

export const CardField: FC<CardField> = ({ movies }) => {
    return (
        <SimpleGrid cols={{ base: 1, xs: 2 }}>
            {movies &&
                movies.map((item) => {
                    return <FilmCard key={item?.id} movie_info={item} />;
                })}
        </SimpleGrid>
    );
};
