'use client';

import { useEffect, useState } from 'react';
import { Button, Flex, Stack } from '@mantine/core';

import { ReleaseYearFilter } from './ReleaseYearFilter';
import RatingsFilter from './RatingsFilter';
import classes from '@/styles/MoviesFilters.module.css';

import { SortBy } from './SortBy';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { filtersSelector, resetFilters } from '@/redux/reducers/filtersSlice';
import { GenresFilter } from './GenresFilter';

const MoviesFilters = () => {
    const dispatch = useAppDispatch();
    const { selectedGenres, selectedYear, ratingFrom, ratingTo } = useAppSelector(
        (state) => state.filters,
    );
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
export default MoviesFilters;
