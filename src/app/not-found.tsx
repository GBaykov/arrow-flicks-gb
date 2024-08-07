'use client';

import { FC } from 'react';
import { Group, Image, Text, useMantineTheme } from '@mantine/core';
import appLogo from '@/assets/icons/logo.svg';

import { EmptyData } from '@/constants/empty';
import EmptyStateMessage from '@/components/emptyStateMessage';

const NotFound: FC = () => {
    const theme = useMantineTheme();
    return (
        <div style={{ maxWidth: '670px', margin: '0 auto' }}>
            <Group style={{ position: 'absolute', top: 24, left: 24 }}>
                <Image src={appLogo.src} />

                <Text fw={600} size={'xxl'} c={theme.colors.purple[5]}>
                    ArrowFlicks
                </Text>
            </Group>
            <EmptyStateMessage info={EmptyData.page_not_found} />
        </div>
    );
};

export default NotFound;
