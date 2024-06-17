import { Group, Image, Text, useMantineTheme } from '@mantine/core';
import yellowStar from '../../assets/icons/yellowStar.svg';
import { FC } from 'react';
import { MovieDetails } from '@redux/appTypes';
import { voteCountReduction } from '@components/utils';

type MovieDetailsVotesProps = {
    movie_details: MovieDetails;
};

export const MovieDetailsVotes: FC<MovieDetailsVotesProps> = ({ movie_details }) => {
    const theme = useMantineTheme();
    return (
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
    );
};
