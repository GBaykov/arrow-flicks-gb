import { FC } from 'react';
import { MovieDescriptionLabel } from './MovieDescriptionLabel';
import { Group, Text, useMantineTheme } from '@mantine/core';
import moment from 'moment';

type MoviePrimiereProps = {
    release_date: string;
};

export const MoviePrimiere: FC<MoviePrimiereProps> = ({ release_date }) => {
    const theme = useMantineTheme();
    return (
        <Group>
            <MovieDescriptionLabel text='Premiere' />
            <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[9]}>
                {moment(release_date).format('MMMM D,YYYY')}
            </Text>{' '}
        </Group>
    );
};
