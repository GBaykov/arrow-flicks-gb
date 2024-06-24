import { Card } from '@mantine/core';

import { FC } from 'react';

import { MovieTrailer } from './MovieTrailer';
import { MovieDescription } from './MovieDescription';
import { MovieProduction } from './MoviePropduction';
import { MovieDetails } from '@/redux/appTypes';

type MovieDetailsBodyProps = {
    movie_details: MovieDetails;
};

export const MovieDetailsBody: FC<MovieDetailsBodyProps> = ({ movie_details }) => {
    return (
        <Card p={{ base: 'xs', xs: 'md', sm: 'xl' }} radius={'lg'}>
            <MovieTrailer trailers={movie_details?.videos?.results} />
            <MovieDescription overview={movie_details?.overview} />
            <MovieProduction production_companies={movie_details?.production_companies} />
        </Card>
    );
};
