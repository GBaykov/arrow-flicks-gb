import { FilmCard } from '@components/card';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { SimpleGrid } from '@mantine/core';
import { moviesList } from '@redux/reducers/moviesSlice';
import { FC } from 'react';

export const CardField: FC = () => {
    const movies = useAppSelector(moviesList);
    console.log(movies);
    return (
        <SimpleGrid cols={2}>
            {movies &&
                movies.map((item) => {
                    return <FilmCard key={item.id} movie_info={item} />;
                })}
        </SimpleGrid>
    );
};
