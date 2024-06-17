import { Card, Flex, Stack, Text, useMantineTheme } from '@mantine/core';
import { MovieDetails } from '@redux/appTypes';
import { FC } from 'react';
import { MovieTitleWithRate } from './MovieTitlewithRate';
import { MovieDetailsVotes } from './MovieDetailsVotes';
import { MoviePoster } from './MoviePoster';

type MovieDetailsHeadProps = {
    movie_details: MovieDetails;
};

export const MovieDetailsHead: FC<MovieDetailsHeadProps> = ({ movie_details }) => {
    const theme = useMantineTheme();
    const release_year = movie_details?.release_date.split('-')[0];
    return (
        <Card p={{ base: 'xs', xs: 'md', sm: 'xl' }} radius={'lg'} mih={400}>
            <Flex
                gap='md'
                justify='flex-start'
                align={{ base: 'center', sm: 'flex-start' }}
                direction={{ base: 'column', sm: 'row' }}
            >
                <MoviePoster movie_details={movie_details} />
                <Flex
                    justify='space-between'
                    direction={'column'}
                    w={'100%'}
                    h={'100%'}
                    mih={'352px'}
                >
                    <Stack gap={'xs'}>
                        <MovieTitleWithRate movie_details={movie_details} />
                        <Text size='lg' fw='400' c={theme.colors.gray[6]}>
                            {release_year}
                        </Text>
                        <MovieDetailsVotes movie_details={movie_details} />
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
    );
};
