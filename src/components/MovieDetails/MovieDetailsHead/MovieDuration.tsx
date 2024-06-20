import { FC } from 'react';
import { MovieDescriptionLabel } from './MovieDescriptionLabel';
import { Group, Text, useMantineTheme } from '@mantine/core';

const filmDuration = (minutes?: number) => {
    if (minutes) {
        const h = Math.floor(minutes / 60);
        const min = String(minutes - h * 60);
        const m = min.length === 2 ? min : `0${min}`;
        return `${h}h${' '}${m}m`;
    }
};

type MovieDurationProps = {
    duration: number;
};

export const MovieDuration: FC<MovieDurationProps> = ({ duration }) => {
    const theme = useMantineTheme();
    return (
        <Group w={'100%'} maw={'400px'}>
            <MovieDescriptionLabel text='Duration' />
            <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[9]}>
                {filmDuration(duration)}
            </Text>{' '}
        </Group>
    );
};
