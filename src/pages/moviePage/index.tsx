import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { AppLayout } from '@pages/layout';
import { appModal, setAppModal } from '@redux/reducers/appSlice';
import {
    useGetMovieDetailsQuery,
    useGetMoviesQuery,
    useLazyGetMovieDetailsQuery,
} from '@redux/services/moviesService';
import { MovieVideo, StoragedItem, StoragedMovie } from '@redux/appTypes';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    ActionIcon,
    Anchor,
    Breadcrumbs,
    Card,
    Divider,
    Flex,
    Group,
    Image,
    Stack,
    Text,
    Title,
    useMantineTheme,
} from '@mantine/core';
import { PATHS } from '@constants/general';
import { getPoster, voteCountReduction } from '@components/utils';
import { movieDetails, moviesList } from '@redux/reducers/moviesSlice';
import yellowStar from '../../assets/icons/yellowStar.svg';
import purpleStar from '../../assets/icons/purpleStar.svg';
import star from '../../assets/icons/star.svg';
import moment from 'moment';

export const MovieDetailPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const theme = useMantineTheme();

    const movieID = Number(useParams().movieId);

    const { data: movie_details } = useGetMovieDetailsQuery(movieID);

    // const movie_details = useAppSelector(movieDetails);
    // console.log(movieID, data);

    // const movies = useAppSelector(moviesList);

    // useEffect(() => {
    //     fethDetails(movieID);
    // }, []);

    const movieTrailer: MovieVideo | null =
        movie_details?.videos?.results.filter((item) => item.type === 'Trailer')[0] || null;

    const onMovieClick = () => {
        navigate(`${PATHS.MAIN}/${movieID}`, { state: movieID });
    };

    const storagedRated = localStorage.getItem('rated');

    const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];
    const ratedMovie = ratedMovies.find((item) => item?.movie_info?.id === movie_details?.id);
    const release_year = movie_details?.release_date.split('-')[0];
    const displayedGenresIds = movie_details?.genres;
    const chosenMovie = useAppSelector(appModal);

    useEffect(() => {
        if (!chosenMovie) {
            localStorage.getItem('rated');
        }
    }, [chosenMovie]);

    const onStarClick = () => {
        if (movie_details) {
            const {
                id,
                original_title,
                poster_path,
                release_date,
                vote_average,
                vote_count,
                genres,
            } = movie_details;
            const genre_ids = genres.map((item) => item.id);
            const movie_info: StoragedMovie = {
                id,
                original_title,
                poster_path,
                release_date,
                vote_average,
                vote_count,
                genre_ids,
            };
            dispatch(
                setAppModal({
                    movie_info,
                    persnal_rate: ratedMovie?.persnal_rate || 0,
                }),
            );
        }
    };

    const filmDuration = (minutes?: number) => {
        if (minutes) {
            const h = Math.floor(minutes / 60);
            const min = String(minutes - h * 60);
            const m = min.length === 2 ? min : `0${min}`;
            return `${h}h${' '}${m}m`;
        }
    };

    return (
        <AppLayout>
            <Stack m={{ base: '40px 0px 0px', sm: '40px 45px 0px', lg: '0 90px 0px' }} gap={'20px'}>
                <Breadcrumbs>
                    <Anchor onClick={() => navigate(PATHS.MAIN)}>Movies</Anchor>
                    <Anchor>{movie_details?.original_title}</Anchor>
                </Breadcrumbs>
                <Card p={{ base: 'xs', xs: 'md', sm: 'xl' }} radius={'lg'} mih={400}>
                    <Flex
                        gap='md'
                        justify='flex-start'
                        align={{ base: 'center', sm: 'flex-start' }}
                        direction={{ base: 'column', sm: 'row' }}
                    >
                        <img
                            src={getPoster(movie_details?.poster_path, 'w300')}
                            width={250}
                            height={352}
                            alt='Film poster'
                        />
                        <Flex
                            justify='space-between'
                            direction={'column'}
                            w={'100%'}
                            h={'100%'}
                            mih={'352px'}
                        >
                            <Stack gap={'xs'}>
                                <Group justify='space-between' wrap='nowrap'>
                                    <Anchor
                                        underline='never'
                                        p={0}
                                        // onClick={onMovieClick}
                                        variant='subtle'
                                        bg={'transparent'}
                                        style={{ wordWrap: 'break-word', display: 'inline-block' }}
                                        fw='600'
                                        size={'xl'}
                                        lh={'100%'}
                                    >
                                        {movie_details?.original_title}
                                    </Anchor>
                                    <Flex gap={'4px'} wrap={'nowrap'} align={'center'}>
                                        <ActionIcon variant='transparent' onClick={onStarClick}>
                                            <img
                                                style={{ border: 'none' }}
                                                src={ratedMovie?.persnal_rate ? purpleStar : star}
                                            />
                                        </ActionIcon>
                                        {ratedMovie?.persnal_rate && (
                                            <Text fw={600} fz={'lg'} lh={'sm'}>
                                                {ratedMovie?.persnal_rate}
                                            </Text>
                                        )}
                                    </Flex>
                                </Group>
                                <Text size='lg' fw='400' c={theme.colors.gray[6]}>
                                    {release_year}
                                </Text>
                                <Group>
                                    <Image w={'24px'} src={yellowStar} />
                                    <Text fw='600' size='lg' c={theme.colors.gray[9]}>
                                        {movie_details?.vote_average.toFixed(1)}
                                    </Text>
                                    <Text fw='400' size='lg' c={theme.colors.gray[6]}>
                                        {'('}
                                        {voteCountReduction(movie_details?.vote_count)}
                                        {')'}
                                    </Text>
                                </Group>
                            </Stack>

                            <Group w={'100%'} maw={'400px'} justify={'space-between'}>
                                <Stack>
                                    <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[6]}>
                                        Duration
                                    </Text>{' '}
                                    <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[6]}>
                                        Premiere
                                    </Text>
                                    <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[6]}>
                                        Budget
                                    </Text>
                                    <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[6]}>
                                        Gross worldwide
                                    </Text>
                                    <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[6]}>
                                        Genres
                                    </Text>
                                </Stack>

                                <Stack justify={'space-between'}>
                                    {' '}
                                    <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[9]}>
                                        {filmDuration(movie_details?.runtime)}
                                    </Text>{' '}
                                    <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[9]}>
                                        {moment(movie_details?.release_date).format('MMMM D,YYYY')}
                                    </Text>{' '}
                                    <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[9]}>
                                        {`$${movie_details?.budget.toLocaleString('en-US')}`}
                                    </Text>{' '}
                                    <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[9]}>
                                        {`$${movie_details?.revenue.toLocaleString('en-US')}`}
                                    </Text>{' '}
                                    <Group gap={'xs'}>
                                        {displayedGenresIds?.map((genre, index) => {
                                            return (
                                                <Text
                                                    lh={'sm'}
                                                    display={'inline-block'}
                                                    key={genre.id}
                                                    size='lg'
                                                    fw='400'
                                                    c={theme.colors.gray[9]}
                                                >
                                                    {genre.name}
                                                    {index !== displayedGenresIds.length - 1 && `,`}
                                                    {<br />}
                                                </Text>
                                            );
                                        })}
                                    </Group>
                                </Stack>
                            </Group>
                        </Flex>
                    </Flex>
                </Card>
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
