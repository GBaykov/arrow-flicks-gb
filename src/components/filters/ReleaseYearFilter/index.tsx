import { useEffect, useState } from 'react';

import { Select, Title } from '@mantine/core';

import commonClasses from '../MoviesFilters.module.css';
import ChevronIcon from '@components/icons/ChevronIcon';
import { filtersYears, setReleaseYear } from '@redux/reducers/filtersSlice';
import { getMoviesYears } from '@components/utils';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';

export const ReleaseYearFilter = () => {
    const [yearOptions, setYearOptions] = useState<Array<string>>([]);

    const selectedYear = useAppSelector(filtersYears);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setYearOptions(getMoviesYears());
    }, []);

    return (
        <Select
            // flex='1 1 100%'
            placeholder='Select release year'
            data={yearOptions}
            maw={'300px'}
            w={{ base: '', sm: '100%' }}
            label={<Title order={5}>Release year</Title>}
            value={selectedYear}
            onChange={(year: string | null) => dispatch(setReleaseYear(year))}
            withCheckIcon={false}
            rightSection={<ChevronIcon />}
            classNames={{
                root: commonClasses.filterRoot,
                label: commonClasses.filterLabel,
                input: commonClasses.inputRoot,
                dropdown: commonClasses.selectDropdown,
                option: commonClasses.selectOption,
            }}
        />
    );
};
