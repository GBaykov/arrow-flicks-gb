import {
    AppShell,
    Burger,
    Button,
    Group,
    Loader,
    Text,
    Title,
    useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, ReactNode } from 'react';
import appLogo from '../assets/icons/logo.svg';
import { useGetGenreListQuery, useGetMoviesQuery } from '@redux/services/moviesService';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appIsLoading } from '@redux/reducers/appSlice';

export type AppLayutProps = {
    children: ReactNode;
};

export const AppLayout: FC<AppLayutProps> = ({ children }) => {
    const [opened, { toggle }] = useDisclosure();
    const { data: genres_data } = useGetGenreListQuery();
    const { data: movies_data } = useGetMoviesQuery();
    const theme = useMantineTheme();
    const isLoading = useAppSelector(appIsLoading);
    return (
        <>
            {isLoading && <Loader size='xl' />}
            {!isLoading && (
                <AppShell
                    // TO DO:  withBorder={false}
                    w={'100%'}
                    bg={theme.colors.gray[1]}
                    withBorder={false}
                    layout='alt'
                    header={{ height: 40 }}
                    navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                    padding='md'
                >
                    <AppShell.Header bg={theme.colors.gray[1]}>
                        <Group h='100%' px='md'>
                            <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
                        </Group>
                    </AppShell.Header>
                    <AppShell.Navbar bg={theme.colors.purple[2]} p='xl'>
                        <Group>
                            <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
                            <img src={appLogo} />
                            <Text>Navbar</Text>
                            <Button variant='filled'>Button</Button>
                        </Group>
                    </AppShell.Navbar>
                    <AppShell.Main p={'40px 90px 82px 370px'}>{children}</AppShell.Main>
                </AppShell>
            )}
        </>
    );
};
