import {
    AppShell,
    Box,
    Burger,
    Flex,
    Group,
    NavLink,
    Stack,
    Text,
    useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, ReactNode } from 'react';
import appLogo from '../assets/icons/logo.svg';

import { PATHS } from '@constants/general';
import { useLocation, useNavigate } from 'react-router-dom';
import './active.module.css';
import { AppModal } from '@components/modal';

import navlink_classes from '../modules.styles/Navlink.module.css';

export type AppLayutProps = {
    children: ReactNode;
};

export const AppLayout: FC<AppLayutProps> = ({ children }) => {
    const [opened, { toggle }] = useDisclosure();
    const theme = useMantineTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const isMovieOrMovieDetails =
        location.pathname.includes(PATHS.MAIN) || location.pathname === PATHS.INITIAL;

    return (
        <Box pos='relative' m={'0 auto'} w={'100%'} h={'100%'} bg={theme.colors.gray[1]}>
            <AppModal />

            <Flex justify={'center'}>
                <AppShell
                    w={'100%'}
                    bg={theme.colors.gray[1]}
                    withBorder={false}
                    layout='alt'
                    header={{ height: 40 }}
                    navbar={{ width: 280, breakpoint: 'lg', collapsed: { mobile: !opened } }}
                    padding='md'
                >
                    <AppShell.Header bg={theme.colors.gray[1]}>
                        <Group h='100%' px='md'>
                            <Burger opened={opened} onClick={toggle} hiddenFrom='lg' size='sm' />
                        </Group>
                    </AppShell.Header>
                    <AppShell.Navbar bg={theme.colors.purple[1]} p='xl'>
                        <Group gap={'sm'}>
                            <Burger opened={opened} onClick={toggle} hiddenFrom='lg' size='sm' />
                            <img src={appLogo} />
                            <Text fw={600} size={'xxl'} c={theme.colors.purple[5]}>
                                ArrowFlicks
                            </Text>
                            <Stack mt={80} gap={'md'} w={'100%'}>
                                <NavLink
                                    data-activelink={isMovieOrMovieDetails}
                                    classNames={{
                                        root: navlink_classes.root,
                                        label: navlink_classes.label,
                                    }}
                                    fz={'lg'}
                                    active={isMovieOrMovieDetails}
                                    label='Movies'
                                    onClick={() => navigate(PATHS.MAIN)}
                                />
                                <NavLink
                                    data-activelink={location.pathname === PATHS.RATED_MOVIES}
                                    classNames={{
                                        root: navlink_classes.root,
                                        label: navlink_classes.label,
                                    }}
                                    fz={'lg'}
                                    active={location.pathname === PATHS.RATED_MOVIES}
                                    label={'Rated movies'}
                                    onClick={() => navigate(PATHS.RATED_MOVIES)}
                                />
                            </Stack>
                        </Group>
                    </AppShell.Navbar>
                    <AppShell.Main
                        h={'100%'}
                        w={'100%'}
                        p={{
                            base: '30px 16px 30px ',
                            xs: '30px 24px 26px ',
                            sm: '30px 30px 46px ',
                            md: '35px 35px 62px ',
                            lg: '40px 50px 72px 330px',
                            xl: '40px 90px 82px 370px',
                        }}
                    >
                        {children}
                    </AppShell.Main>
                </AppShell>
            </Flex>
        </Box>
    );
};
