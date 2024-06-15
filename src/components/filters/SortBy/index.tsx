import { Select, Title } from '@mantine/core';

import commonClasses from '../MoviesFilters.module.css';
import { filtersSortBy, setSortBy } from '@redux/reducers/filtersSlice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { DEFAULT_SORT_OPTION, sortData } from '@constants/general';
import ChevronIcon from '@components/icons/ChevronIcon';

export const SortBy = () => {
    const sortBy = useAppSelector(filtersSortBy);
    const dispatch = useAppDispatch();

    return (
        <Select
            onChange={(value) =>
                value && dispatch(setSortBy(value as (typeof sortData)[number]['value']))
            }
            maw={{ base: '218px', sm: '284px' }}
            label={<Title order={5}>Sort by</Title>}
            // data={sortData.map((item) => item.label)}
            data={sortData}
            defaultValue={DEFAULT_SORT_OPTION}
            rightSection={<ChevronIcon />}
            withCheckIcon={false}
            classNames={{
                root: commonClasses.filterRoot,
                label: commonClasses.filterLabel,
                input: commonClasses.inputRoot,
                dropdown: commonClasses.selectDropdown,
                option: commonClasses.selectOption,
            }}
            w={{ base: '100%', sm: 'auto' }}
            value={sortBy}
            allowDeselect={false}
        />
    );
};
