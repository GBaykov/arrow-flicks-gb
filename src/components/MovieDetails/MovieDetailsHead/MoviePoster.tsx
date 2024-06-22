import { getPoster } from '@components/utils';
import { MovieDetails } from '@redux/appTypes';
import { FC } from 'react';
type MoviePosterProps = {
    movie_details: MovieDetails;
};

export const MoviePoster: FC<MoviePosterProps> = ({ movie_details }) => {
    return (
        <img
            src={getPoster(movie_details?.poster_path, 'w300')}
            width={250}
            height={352}
            alt='Film poster'
        />
    );
};
