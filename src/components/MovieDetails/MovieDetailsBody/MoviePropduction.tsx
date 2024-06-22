import { getPoster } from '@components/utils';
import { Group, Stack, Title } from '@mantine/core';

import { FC } from 'react';

type MovieProductionProps = {
    production_companies: [
        {
            id: number;
            logo_path: string;
            name: string;
            origin_country: string;
        },
    ];
};

export const MovieProduction: FC<MovieProductionProps> = ({ production_companies }) => {
    return (
        <div>
            <Title order={4} mb={'md'}>
                Production
            </Title>
            <Stack gap={'sm'}>
                {production_companies.map((item) => (
                    <Group>
                        <img
                            width={'40px'}
                            src={getPoster(item.logo_path, 'w45', 'Icon')}
                            alt='Production companie'
                        />
                        <Title order={5}>{item.name}</Title>
                    </Group>
                ))}
            </Stack>
        </div>
    );
};
