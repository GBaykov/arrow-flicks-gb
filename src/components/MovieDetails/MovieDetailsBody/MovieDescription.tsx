import { Divider, Title } from '@mantine/core';

import { FC } from 'react';

type MovieDescriptionProps = {
    overview: string;
};

export const MovieDescription: FC<MovieDescriptionProps> = ({ overview }) => {
    return (
        <div>
            <Title order={4} pb={'md'}>
                Description
            </Title>
            <Title order={6}>{overview}</Title>
            <Divider my='xs' mb={'20px'} mt={'20px'} />
        </div>
    );
};
