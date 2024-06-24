'use client';

import {
    ActionIcon,
    Anchor,
    Card,
    Flex,
    Group,
    Image,
    Stack,
    Text,
    useMantineTheme,
} from '@mantine/core';

import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import yellowStar from '../../assets/icons/yellowStar.svg';
import purpleStar from '../../assets/icons/purpleStar.svg';
import star from '../../assets/icons/star.svg';

import GenresList from './GenresList/GenresList';
import { MoviePoster } from './MoviePoster';
import { MovieItem, StoragedItem } from '@/redux/appTypes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { appModal, setAppModal } from '@/redux/reducers/appSlice';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants/app';
import { voteCountReduction } from '../utils';

export type FilmCardProps = {
    movie_info: MovieItem;
};

export const FilmCard: FC<FilmCardProps> = ({ movie_info }) => {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const chosenMovie = useAppSelector(appModal);

    // const onMovieClick = () => {
    //     navigate(`${PATHS.MAIN}/${movie_info?.id}`, { state: movie_info?.id });
    // };

    const storagedRated = localStorage.getItem('rated');

    const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];
    const ratedMovie = ratedMovies.find((item) => item?.movie_info?.id === movie_info?.id);
    const [isRated, setIsRated] = useState(Boolean(ratedMovie));
    const release_year = movie_info?.release_date?.split('-')[0];
    const displayedGenresIds = movie_info?.genre_ids;

    const onStarClick = () => {
        dispatch(setAppModal({ movie_info, persnal_rate: ratedMovie?.persnal_rate || 0 }));
    };

    useEffect(() => {
        setIsRated(Boolean(ratedMovie));
    }, [chosenMovie]);

    if (!movie_info) {
        return null;
    }
    return (
        <Card p={'lg'} mih={218} radius={'lg'}>
            <Flex
                gap='md'
                justify='flex-start'
                align={{ base: 'center', sm: 'flex-start' }}
                direction={{ base: 'column', sm: 'row' }}
            >
                {' '}
                <MoviePoster
                    size='lg'
                    poster_path={movie_info?.poster_path}
                    title={movie_info?.original_title}
                />
                {/* <img
                    src={getPoster(movie_info?.poster_path, 'w154')}
                    width={120}
                    height={170}
                    alt='Film poster'
                /> */}
                <Flex justify='space-between' direction={'column'} w={'100%'} h={'100%'}>
                    <Stack gap={'xs'}>
                        <Group justify='space-between' wrap='nowrap'>
                            <Anchor
                                lh={'sm'}
                                underline='never'
                                p={0}
                                // onClick={onMovieClick}
                                component={Link}
                                href={`${APP_ROUTES.MOVIES}/${movie_info.id}`}
                                variant='subtle'
                                bg={'transparent'}
                                style={{ wordWrap: 'break-word', display: 'inline-block' }}
                                fw='600'
                                fz={{ base: 'md', xs: 'lg', md: 'xl' }}
                            >
                                {movie_info?.original_title}
                            </Anchor>
                            <Flex gap={'4px'} wrap={'nowrap'} align={'center'}>
                                <ActionIcon variant='transparent' onClick={onStarClick}>
                                    <Image
                                        style={{ border: 'none' }}
                                        src={isRated ? purpleStar : star.src}
                                    />
                                </ActionIcon>
                                {isRated && (
                                    <Text lh={'sm'} fw={600} fz={'lg'}>
                                        {ratedMovie?.persnal_rate}
                                    </Text>
                                )}
                            </Flex>
                        </Group>
                        <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[6]}>
                            {release_year}
                        </Text>
                        <Group>
                            <Image lh={'sm'} w={'24px'} src={yellowStar.src} />
                            <Text lh={'sm'} fw='600' size='lg' c={theme.colors.gray[9]}>
                                {movie_info?.vote_average?.toFixed(1)}
                            </Text>
                            <Text lh={'sm'} fw='400' size='lg' c={theme.colors.gray[6]}>
                                {'('}
                                {voteCountReduction(movie_info?.vote_count)}
                                {')'}
                            </Text>
                        </Group>
                    </Stack>
                    <GenresList genreIds={displayedGenresIds} />
                </Flex>
            </Flex>
        </Card>
    );
};
