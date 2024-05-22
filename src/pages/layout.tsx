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
import { useGetGenreListQuery, useGetMoviesQuery } from '@redux/services/moviesService';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appFilters, appIsLoading, appSortBy } from '@redux/reducers/appSlice';
import { AppLoader } from '@components/loader';
import { PATHS, sortData } from '@constants/general';
import { useLocation, useNavigate } from 'react-router-dom';
import './active.module.css';
import { AppModal } from '@components/modal';
import { moviesPage } from '@redux/reducers/moviesSlice';
import { moviesArgsConstructor } from '@components/utils';
export type AppLayutProps = {
    children: ReactNode;
};

export const AppLayout: FC<AppLayutProps> = ({ children }) => {
    const [opened, { toggle }] = useDisclosure();
    useGetGenreListQuery();
    const page = useAppSelector(moviesPage);
    const filters = useAppSelector(appFilters);
    const sortBy = useAppSelector(appSortBy);
    const sort_by = sortData.find((item) => item.label === sortBy)?.name;
    const args = moviesArgsConstructor(filters, page, sort_by);
    useGetMoviesQuery(args);
    const theme = useMantineTheme();
    const isLoading = useAppSelector(appIsLoading);
    const location = useLocation();
    const navigate = useNavigate();

    const isMovieOrMovieDetails =
        location.pathname.includes(PATHS.MAIN) || location.pathname === PATHS.INITIAL;

    return (
        <Box pos='relative' m={'0 auto'} w={'100%'} bg={theme.colors.gray[1]}>
            {<AppModal />}
            {isLoading && <AppLoader visible={isLoading} />}
            {!isLoading && (
                <Flex justify={'center'}>
                    <AppShell
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
                                <Burger
                                    opened={opened}
                                    onClick={toggle}
                                    hiddenFrom='sm'
                                    size='sm'
                                />
                            </Group>
                        </AppShell.Header>
                        <AppShell.Navbar bg={theme.colors.purple[2]} p='xl'>
                            <Group gap={'sm'}>
                                <Burger
                                    opened={opened}
                                    onClick={toggle}
                                    hiddenFrom='sm'
                                    size='sm'
                                />
                                <img src={appLogo} />
                                <Text fw={600} size={'xxl'} c={theme.colors.purple[5]}>
                                    ArrowFlicks
                                </Text>
                                <Stack mt={80} gap={'md'} w={'100%'}>
                                    <NavLink
                                        fz={'lg'}
                                        component='button'
                                        active={isMovieOrMovieDetails}
                                        // label={'Movies'}
                                        label={<Text fz={'lg'}>Movies</Text>}
                                        onClick={() => navigate(PATHS.MAIN)}
                                    />
                                    <NavLink
                                        fz={'lg'}
                                        component='button'
                                        active={location.pathname === PATHS.RATED_MOVIES}
                                        // label={'Rated movies'}
                                        label={<Text fz={'lg'}>Rated movies</Text>}
                                        onClick={() => navigate(PATHS.RATED_MOVIES)}
                                    />
                                </Stack>
                            </Group>
                        </AppShell.Navbar>
                        <AppShell.Main miw={'100%'} p={'40px 90px 82px 370px'}>
                            {children}
                        </AppShell.Main>
                    </AppShell>
                </Flex>
            )}
        </Box>
    );
};
