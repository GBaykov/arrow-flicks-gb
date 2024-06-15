'use client';

import { useEffect, useState } from 'react';

import { Accordion, Button, Flex, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { filtersSelector, resetFilters } from '@redux/reducers/filtersSlice';
import { GenresFilter } from './GenresFilter';
import { ReleaseYearFilter } from './ReleaseYearFilter';
import RatingsFilter from './RatingsFilter';
import classes from './MoviesFilters.module.css';
import { SortBy } from './SortBy';

export const MoviesFilters = () => {
    const dispatch = useAppDispatch();
    const { selectedGenres, selectedYear, ratingFrom, ratingTo } = useAppSelector(filtersSelector);
    const [allFiltersEmpty, setAllFiltersEmpty] = useState(false);

    useEffect(() => {
        setAllFiltersEmpty(
            selectedGenres.length === 0 &&
                selectedYear === null &&
                ratingFrom === undefined &&
                ratingTo === undefined,
        );
    }, [selectedGenres, selectedYear, ratingFrom, ratingTo]);

    return (
        <Stack mb={{ base: 'xs', xs: 'sm', sm: 'md' }} gap={'xl'}>
            <Flex
                gap={{ base: 'xs', xs: 'md' }}
                align={'flex-end'}
                wrap={{ base: 'wrap', sm: 'nowrap' }}
            >
                <GenresFilter />
                <ReleaseYearFilter />
                <RatingsFilter />
                <Button
                    // flex='1 0 auto'
                    variant='transparent'
                    className={classes.resetButton}
                    onClick={() => dispatch(resetFilters())}
                    disabled={allFiltersEmpty}
                >
                    Reset filters
                </Button>
            </Flex>
            <Flex justify={{ base: 'flex-start', sm: 'flex-end' }} w={'100%'}>
                <SortBy />
            </Flex>
        </Stack>
    );
};
