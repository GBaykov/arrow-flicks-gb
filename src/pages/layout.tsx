import { AppShell, Burger, Button, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, ReactNode } from 'react';
import appLogo from '../assets/icons/logo.svg';

export type AppLayutProps = {
    children: ReactNode;
};

export const AppLayout: FC<AppLayutProps> = ({ children }) => {
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            // TO DO:  withBorder={false}
            withBorder={true}
            layout='alt'
            header={{ height: 40 }}
            navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding='md'
        >
            <AppShell.Header>
                <Group h='100%' px='md'>
                    <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p='xl'>
                <Group>
                    <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
                    <img src={appLogo} />
                    <Text>Navbar</Text>
                    <Button variant='filled'>Button</Button>
                </Group>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
};
