"use client";

import React from "react";
import {
  AppShell,
  Box,
  Burger,
  Flex,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import appLogo from "@/assets/icons/logo.svg";

import { APP_ROUTES } from "@/constants/app";
import StyledLink from "@/components/StyledLink/StyledLink";

export type AppLayutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();

  return (
    <Box
      pos="relative"
      m={"0 auto"}
      w={"100%"}
      h={"100%"}
      bg={theme.colors.gray[1]}
    >
      <Flex justify={"center"}>
        <AppShell
          w={"100%"}
          bg={theme.colors.gray[1]}
          withBorder={false}
          layout="alt"
          header={{ height: 40 }}
          navbar={{
            width: 280,
            breakpoint: "lg",
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header bg={theme.colors.gray[1]}>
            <Group h="100%" px="md">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="lg"
                size="sm"
              />
            </Group>
          </AppShell.Header>
          <AppShell.Navbar bg={theme.colors.purple[1]} p="xl">
            <Group gap={"sm"}>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="lg"
                size="sm"
              />
              <img src={appLogo.src} />
              <Text fw={600} size={"xxl"} c={theme.colors.purple[5]}>
                ArrowFlicks
              </Text>
              <Stack mt={80} gap={"md"} w={"100%"} justify={"flex-start"}>
                <StyledLink href={APP_ROUTES.MOVIES}>Movies</StyledLink>
                <StyledLink href={APP_ROUTES.RATED}>Rated movies</StyledLink>
              </Stack>
            </Group>
          </AppShell.Navbar>
          <AppShell.Main
            h={"100%"}
            w={"100%"}
            p={{
              base: "30px 16px 30px ",
              xs: "30px 24px 26px ",
              sm: "30px 30px 46px ",
              md: "35px 35px 62px ",
              lg: "40px 50px 72px 330px",
              xl: "40px 90px 82px 370px",
            }}
          >
            {children}
          </AppShell.Main>
        </AppShell>
      </Flex>
    </Box>
  );
};

export default MainLayout;
