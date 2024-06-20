import { Text, useMantineTheme } from '@mantine/core';
import { FC } from 'react';

type MovieDescriptionLabelProps = {
    text: string;
};
export const MovieDescriptionLabel: FC<MovieDescriptionLabelProps> = ({ text }) => {
    const theme = useMantineTheme();
    return (
        <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[6]}>
            {text}
        </Text>
    );
};
