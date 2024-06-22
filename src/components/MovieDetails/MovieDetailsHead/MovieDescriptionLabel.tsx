import { Text, useMantineTheme } from '@mantine/core';
import { FC } from 'react';

type MovieDescriptionLabelProps = {
    text: string;
};
export const MovieDescriptionLabel: FC<MovieDescriptionLabelProps> = ({ text }) => {
    const theme = useMantineTheme();
    return (
        <Text
            w={'100%'}
            maw={{ base: 90, sm: 140 }}
            lh={'sm'}
            size='lg'
            fw='400'
            c={theme.colors.gray[6]}
        >
            {text}
        </Text>
    );
};
