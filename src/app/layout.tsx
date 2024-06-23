import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { AppMantineTheme } from '../mantine.theme';
import { AppModal } from '../components/modal';
import StoreProvider from './StoreProvider';
// import { store } from '../redux/configure-store';
// import {  store } from '@redux/configure-store.ts';

export const metadata = {
    title: 'ArrowFlicks',
    description: 'ArrowFlicks - the movie search-storing application',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang='en'>
        <head>
            <link rel='shortcut icon' href='/logo.svg' />
            <meta
                name='viewport'
                content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
            />
        </head>
        <body>
            <MantineProvider theme={AppMantineTheme}>
                <StoreProvider>
                    {children}
                    <AppModal />
                </StoreProvider>
                {/* <Provider store={store}>
                    {children}
                    <AppModal />
                </Provider> */}
            </MantineProvider>
        </body>
    </html>
);

export default RootLayout;
