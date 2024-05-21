import { LoadingOverlay, Button, Group, Box, Text } from '@mantine/core';
import { FC } from 'react';

export type AppLoaderProps = {
    visible: boolean;
};
export const AppLoader: FC<AppLoaderProps> = ({ visible }) => {
    return (
        <Box pos='relative' w={'100%'} h={'100%'} miw={320} mih={'100vh'} m={'0 auto'}>
            <LoadingOverlay
                w={'100%'}
                visible={visible}
                zIndex={1000}
                overlayProps={{ radius: 'xl', blur: 2 }}
                loaderProps={{
                    size: 'xl',
                    color: 'purple',
                    type: 'oval',
                }}
            />
        </Box>
    );
};
