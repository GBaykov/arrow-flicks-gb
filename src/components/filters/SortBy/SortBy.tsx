import { Select, Title } from '@mantine/core';
import commonClasses from '@/styles/MoviesFilters.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { filtersSortBy, setSortBy } from '@/redux/reducers/filtersSlice';
import { DEFAULT_SORT_OPTION, sortData } from '@/constants/general';
import ChevronIcon from '@/components/icons/ChevronIcon';

 const SortBy = () => {
    const sortBy = useAppSelector(filtersSortBy);
    const dispatch = useAppDispatch();

    return (
        <Select
            onChange={(value) =>
                value && dispatch(setSortBy(value as (typeof sortData)[number]['value']))
            }
            maw={{ base: '218px', sm: '284px' }}
            label={<Title order={5}>Sort by</Title>}
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

export default SortBy;