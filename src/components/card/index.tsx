import { API_URL, ApiEndpoints, IMG_BASE_URL, PATHS } from '@constants/general';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    ActionIcon,
    Anchor,
    Button,
    Card,
    Flex,
    Group,
    Image,
    Stack,
    Text,
    useMantineTheme,
} from '@mantine/core';
import { MovieItem } from '@redux/storeTypes';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import yellowStar from '../../assets/icons/yellowStar.svg';
import purpleStar from '../../assets/icons/purpleStar.svg';
import star from '../../assets/icons/star.svg';
import { genreList } from '@redux/reducers/moviesSlice';

export type FilmCardProps = {
    movie_info: MovieItem;
};

import noPosterImg from '../../assets/images/noPoster.png';

export const FilmCard: FC<FilmCardProps> = ({ movie_info }) => {
    const genres = useAppSelector(genreList);
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const onMovieClick = () => {
        navigate(`${PATHS.MAIN}/${movie_info.id}`, { state: movie_info.id });
    };

    const storagedRated = localStorage.getItem('rated');
    const ratedMovieIds: number[] = storagedRated ? JSON.parse(storagedRated) : [];
    const isRated = ratedMovieIds.includes(movie_info.id);
    const release_year = movie_info.release_date.split('-')[0];
    const displayedGenresIds = movie_info.genre_ids.slice(0, 3);
    const getGenreNameById = (id: number) => {
        const genre = genres.find((item) => item.id === id);
        return genre?.name;
    };

    const getPoster = (path: string, poster_width: string) => {
        return path ? `${IMG_BASE_URL}${poster_width}${movie_info.poster_path}` : noPosterImg;
    };

    return (
        <Card padding={'24px'} withBorder h={218}>
            <Flex gap='md' justify='flex-start' align='flex-start' direction='row'>
                {' '}
                <img
                    src={getPoster(movie_info.poster_path, 'w154')}
                    width={120}
                    height={170}
                    alt='Film poster'
                />
                <Flex justify='space-between' direction={'column'} w={'100%'} h={'100%'}>
                    <Stack>
                        <Group justify='space-between' wrap='nowrap'>
                            <Anchor
                                underline='never'
                                p={0}
                                onClick={onMovieClick}
                                variant='subtle'
                                bg={'transparent'}
                                style={{ wordWrap: 'break-word', display: 'inline-block' }}
                                fw='600'
                                size={'xl'}
                            >
                                {/* <Text
                                    fw='600'
                                    size={'xl'}
                                    w={240}
                                    style={{ wordWrap: 'break-word' }}
                                > */}
                                {movie_info.title}
                                {/* </Text> */}
                            </Anchor>
                            <ActionIcon
                                size={'24px'}
                                variant='transparent'
                                color={isRated ? theme.colors.purple[5] : theme.colors.gray[3]}
                            >
                                <img
                                    style={{ border: 'none' }}
                                    src={isRated ? purpleStar : star}
                                    // src={star}
                                />
                                {isRated && (
                                    <Text fw={600} fz={'lg'} lh={'sm'}>
                                        {' '}
                                    </Text>
                                )}
                            </ActionIcon>
                        </Group>
                        <Text size='lg' fw='400' c={theme.colors.gray[6]}>
                            {release_year}
                        </Text>
                        <Group>
                            <Image w={'24px'} src={yellowStar} />
                            <Text fw='600' size='lg' c={theme.colors.gray[9]}>
                                {movie_info.vote_average.toFixed(1)}
                            </Text>
                            <Text fw='400' size='lg' c={theme.colors.gray[6]}>
                                {'('}
                                {movie_info.vote_count}
                                {')'}
                            </Text>
                        </Group>
                    </Stack>
                    <Group gap={'xs'}>
                        <Text size='lg' fw='400' c={theme.colors.gray[6]}>
                            Genres
                        </Text>

                        {displayedGenresIds.map((id, index) => {
                            return (
                                <Text
                                    lh={'sm'}
                                    display={'inline-block'}
                                    key={id}
                                    size='lg'
                                    fw='400'
                                    c={theme.colors.gray[9]}
                                >
                                    {getGenreNameById(id)}
                                    {index !== displayedGenresIds.length - 1 && `,`}
                                    {<br />}
                                </Text>
                            );
                        })}
                    </Group>
                </Flex>
            </Flex>
        </Card>
    );
};
