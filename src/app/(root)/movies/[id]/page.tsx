'use client';


import MovieDetailsBody from '@/components/MovieDetails/MovieDetailsBody/MovieDetailsBody';
import MovieDetailsHead from '@/components/MovieDetails/MovieDetailsHead/MovieDetailsHead';
import { APP_ROUTES } from '@/constants/app';
import { useGetMovieDetailsQuery } from '@/redux/services/moviesService';
import { Anchor, Breadcrumbs, Center, Loader, Stack } from '@mantine/core';

const MoviePage = ({ params }: { params: { id: string } }) => {
    // const movieID = Number(useParams().movieId);

    const { data: movie_details, isLoading } = useGetMovieDetailsQuery(params.id);

    //const chosenMovie = useAppSelector((state) => state.app.movieForModal);

    // useEffect(() => {
    //     if (!chosenMovie) {
    //         localStorage.getItem('rated');
    //     }
    // }, [chosenMovie]);

    if (!isLoading && movie_details) {
        return (
            <Stack m={{ base: '40px 0px 0px', sm: '40px 45px 0px', lg: '0 90px 0px' }} gap={'20px'}>
                <Breadcrumbs>
                    <Anchor href={APP_ROUTES.MOVIES}>Movies</Anchor>
                    <Anchor>{movie_details?.original_title}</Anchor>
                </Breadcrumbs>
                {movie_details && <MovieDetailsHead movie_details={movie_details} />}
                {movie_details && <MovieDetailsBody movie_details={movie_details} />}
            </Stack>
        );
    }
    return (
        <Center h='100%'>
            <Loader size='xl' />
        </Center>
    );
};

export default MoviePage;
