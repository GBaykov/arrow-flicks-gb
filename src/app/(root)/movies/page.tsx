'use client';

import { CardField } from '@/components/cardField';
import { MoviesFilters } from '@/components/filters';
import { Container, Title } from '@mantine/core';

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
