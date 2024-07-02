"use client";

import CardField from "@/components/CardField/CardField";
import MoviesFilters from "@/components/filters/MoviesFilters";

import { Container, Title } from "@mantine/core";

const HomePage = () => (
  <Container p={0} m={0} size={980}>
    <Title order={1} mb={{ base: 20, sm: 40 }}>
      Movies
    </Title>
    <MoviesFilters />
    <CardField />
  </Container>
);

export default HomePage;
