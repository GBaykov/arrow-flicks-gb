import { Card, Flex, Stack, Text, useMantineTheme } from '@mantine/core';
// import { MovieDetails } from '@redux/appTypes';
import { FC } from 'react';
import { MovieTitleWithRate } from './MovieTitlewithRate';
import { MovieDetailsVotes } from './MovieDetailsVotes';
// import { MoviePoster } from './MoviePoster';
import { MovieDuration } from './MovieDuration';
import { MoviePrimiere } from './MoviePremiere';
import { MovieBudget } from './MovieBudget';
import { MovieGenres } from './MovieGenres';
import { MoviePoster } from '@/components/card/MoviePoster';
import { MovieDetails } from '@/redux/appTypes';

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
                <MoviePoster
                    title={movie_details.original_title}
                    poster_path={movie_details.poster_path}
                    size='lg'
                />
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
                        <MovieDetailsVotes
                            vote_average={movie_details.vote_average}
                            vote_count={movie_details.vote_count}
                        />
                    </Stack>

                    <Stack w={'100%'} maw={'400px'}>
                        <MovieDuration duration={movie_details?.runtime} />
                        <MoviePrimiere release_date={movie_details?.release_date} />
                        <MovieBudget budget={movie_details?.budget} />
                        <MovieBudget budget={movie_details?.revenue} />
                        <MovieGenres genres={movie_details?.genres} />
                    </Stack>
                </Flex>
            </Flex>
        </Card>
    );
};
