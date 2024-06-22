import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { AppLayout } from '@pages/layout';
import { appModal } from '@redux/reducers/appSlice';
import { useGetMovieDetailsQuery } from '@redux/services/moviesService';
import { MovieVideo } from '@redux/appTypes';
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Anchor, Breadcrumbs, Card, Divider, Group, Stack, Title } from '@mantine/core';
import { PATHS } from '@constants/general';
import { getPoster } from '@components/utils';

import { MovieDetailsHead } from '@components/MovieDetails/MovieDetailsHead';

export const MovieDetailPage: FC = () => {
    const navigate = useNavigate();

    const movieID = Number(useParams().movieId);

    const { data: movie_details } = useGetMovieDetailsQuery(movieID);

    const movieTrailer: MovieVideo | null =
        movie_details?.videos?.results.filter((item) => item.type === 'Trailer')[0] || null;

    const chosenMovie = useAppSelector(appModal);

    useEffect(() => {
        if (!chosenMovie) {
            localStorage.getItem('rated');
        }
    }, [chosenMovie]);

    console.log(movie_details);
    return (
        <AppLayout>
            <Stack m={{ base: '40px 0px 0px', sm: '40px 45px 0px', lg: '0 90px 0px' }} gap={'20px'}>
                <Breadcrumbs>
                    <Anchor onClick={() => navigate(PATHS.MAIN)}>Movies</Anchor>
                    <Anchor>{movie_details?.original_title}</Anchor>
                </Breadcrumbs>
                {movie_details && <MovieDetailsHead movie_details={movie_details} />}

                {
                    <Card p={{ base: 'xs', xs: 'md', sm: 'xl' }} radius={'lg'}>
                        {movieTrailer && (
                            <div>
                                <Title order={4} pb={'md'}>
                                    Trailer
                                </Title>

                                <Group
                                    h={{ base: '151px', sm: '281px' }}
                                    w={{ base: '270px', sm: '500px' }}
                                >
                                    {' '}
                                    <iframe
                                        width={'100%'}
                                        height={'100%'}
                                        title='Youtube player'
                                        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                                        src={`https://youtube.com/embed/${movieTrailer?.key}?autoplay=0`}
                                    ></iframe>
                                </Group>
                                <Divider my='xs' mb={'20px'} mt={'20px'} />
                            </div>
                        )}
                        {movie_details?.overview && (
                            <div>
                                <Title order={4} pb={'md'}>
                                    Description
                                </Title>
                                <Title order={6}>{movie_details?.overview}</Title>
                                <Divider my='xs' mb={'20px'} mt={'20px'} />
                            </div>
                        )}
                        {!!movie_details?.production_companies.length && (
                            <div>
                                <Title order={4} mb={'md'}>
                                    Production
                                </Title>
                                <Stack gap={'sm'}>
                                    {movie_details?.production_companies.map((item) => (
                                        <Group>
                                            <img
                                                width={'40px'}
                                                src={getPoster(item.logo_path, 'w45', 'Icon')}
                                                alt='Production companie'
                                            />
                                            <Title order={5}>{item.name}</Title>
                                        </Group>
                                    ))}
                                </Stack>
                            </div>
                        )}
                    </Card>
                }
            </Stack>
        </AppLayout>
    );
};
