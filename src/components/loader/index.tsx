import { LoadingOverlay, Button, Group, Box, Text } from '@mantine/core';
import { FC } from 'react';

export type AppLoaderProps = {
    visible: boolean;
};
export const AppLoader: FC<AppLoaderProps> = ({ visible }) => {
    console.log('loader111111111111111111');
    return (
        <Box pos='relative' w={'100%'} h={'100%'} miw={320} mih={'100vh'} m={'0 auto'}>
            <LoadingOverlay
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
