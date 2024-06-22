import { FC } from 'react';
import { MovieDescriptionLabel } from './MovieDescriptionLabel';
import { Group, Text, useMantineTheme } from '@mantine/core';

type MovieBudgetProps = {
    budget: number;
};

export const MovieBudget: FC<MovieBudgetProps> = ({ budget }) => {
    const theme = useMantineTheme();
    return (
        <Group w={'100%'} maw={'400px'}>
            <MovieDescriptionLabel text='Budget' />
            <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[9]}>
                {`$${budget.toLocaleString('en-US')}`}
            </Text>{' '}
        </Group>
    );
};
