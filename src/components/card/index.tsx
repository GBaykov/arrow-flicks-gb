import { API_URL, ApiEndpoints, IMG_BASE_URL, PATHS } from '@constants/general';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    Card,
    Flex,
    Group,
    Image,
    NavLink,
    Stack,
    Text,
    ThemeIcon,
    useMantineTheme,
} from '@mantine/core';
import { MovieItem } from '@redux/storeTypes';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import yellowStar from '../../assets/icons/yellowStar.svg';
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
        <Card padding='lg' withBorder>
            <Flex gap='md' justify='flex-start' align='flex-start' direction='row'>
                <img
                    src={getPoster(movie_info.poster_path, 'w154')}
                    width={120}
                    height={170}
                    alt='Film poster'
                />
                <Stack justify='space-between'>
                    <Flex direction='column'>
                        <Group m={0} justify='space-between' mt='md' mb='xs' wrap='nowrap'>
                            <NavLink
                                p={0}
                                onClick={onNavLinkClick}
                                label={movie_info.title}
                                variant='subtle'
                                active
                            />
                            <ThemeIcon
                                color={isRated ? theme.colors.purple[5] : theme.colors.gray[3]}
                                variant='filled'
                                size='md'
                            >
                                <Image src={yellowStar} />
                            </ThemeIcon>
                        </Group>
                        <Text size='sm'>{release_year}</Text>
                        <Group>
                            <Image src={yellowStar} />
                            <Text size='sm' c={theme.colors.gray[6]}>
                                {movie_info.vote_average}
                            </Text>
                            <Text size='sm' c={theme.colors.gray[6]}>
                                {'('}
                                {movie_info.vote_count}
                                {')'}
                            </Text>
                        </Group>
                    </Flex>
                    <Text c={theme.colors.gray[6]}>
                        Genres{' '}
                        {displayedGenresIds.map((id, index) => {
                            return (
                                <span key={id} color={theme.colors.gray[9]}>
                                    {getGenreNameById(id)}
                                    {index !== movie_info.genre_ids.length - 1 && ','}
                                </span>
                            );
                        })}
                    </Text>
                </Stack>
            </Flex>
        </Card>
    );
};
