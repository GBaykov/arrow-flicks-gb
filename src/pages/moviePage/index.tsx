import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { AppLayout } from '@pages/layout';
import { appModal } from '@redux/reducers/appSlice';
import { useGetMovieDetailsQuery } from '@redux/services/moviesService';
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Anchor, Breadcrumbs, Stack } from '@mantine/core';
import { PATHS } from '@constants/general';

import { MovieDetailsHead } from '@components/MovieDetails/MovieDetailsHead';
import { MovieDetailsBody } from '@components/MovieDetails/MovieDetailsBody';

export const MovieDetailPage: FC = () => {
    const navigate = useNavigate();

    const movieID = Number(useParams().movieId);

    const { data: movie_details } = useGetMovieDetailsQuery(movieID);

    const chosenMovie = useAppSelector(appModal);

    useEffect(() => {
        if (!chosenMovie) {
            localStorage.getItem('rated');
        }
    }, [chosenMovie]);

    return (
        <AppLayout>
            <Stack m={{ base: '40px 0px 0px', sm: '40px 45px 0px', lg: '0 90px 0px' }} gap={'20px'}>
                <Breadcrumbs>
                    <Anchor onClick={() => navigate(PATHS.MAIN)}>Movies</Anchor>
                    <Anchor>{movie_details?.original_title}</Anchor>
                </Breadcrumbs>
                {movie_details && <MovieDetailsHead movie_details={movie_details} />}
                {movie_details && <MovieDetailsBody movie_details={movie_details} />}
            </Stack>
        </AppLayout>
    );
};
