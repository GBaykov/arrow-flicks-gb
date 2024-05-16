import { LoadingOverlay, Button, Group, Box } from '@mantine/core';
import { FC } from 'react';

export type AppLoaderProps = {
    visible: boolean;
};
export const AppLoader: FC<AppLoaderProps> = ({ visible }) => {
    return (
        // <>
        //     <Box pos='relative'>
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

        //     </Box>

        // </>
    );
};
