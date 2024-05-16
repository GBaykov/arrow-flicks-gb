import { API_URL, ApiEndpoints, IMG_BASE_URL, PATHS } from '@constants/general';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    ActionIcon,
    Button,
    Card,
    Flex,
    Group,
    Image,
    NavLink,
    Stack,
    Text,
    ThemeIcon,
    rem,
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

    const onNavLinkClick = () => {
        navigate(`${PATHS.MAIN}/${movie_info.id}`);
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
                            <Button p={0} onClick={onNavLinkClick} variant='subtle'>
                                <Text fw='600' size={'xl'}>
                                    {movie_info.title}
                                </Text>
                            </Button>
                            <ActionIcon
                                size={'24px'}
                                variant='transparent'
                                color={isRated ? theme.colors.purple[5] : theme.colors.gray[3]}
                            >
                                <img
                                    src={isRated ? purpleStar : star}
                                    // src={star}
                                />
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
                    <Group>
                        {' '}
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
                                    {index !== movie_info.genre_ids.length - 1 && ','}
                                </Text>
                            );
                        })}
                    </Group>
                </Flex>
            </Flex>
        </Card>
    );
};
