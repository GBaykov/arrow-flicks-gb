import { Loader, MultiSelect, Title } from '@mantine/core';

import commonClasses from '@/styles/MoviesFilters.module.css';
import classes from '@/styles/GenresFilter.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { filtersGenres, setGenres } from '@/redux/reducers/filtersSlice';
import { useGetGenreListQuery } from '@/redux/services/moviesService';
import ChevronIcon from '@/components/icons/ChevronIcon';

 const GenresFilter = () => {
    const selectedGenres = useAppSelector(filtersGenres);
    const dispatch = useAppDispatch();

    const { data, isLoading } = useGetGenreListQuery();

    return (
        <MultiSelect
            onChange={(genres: string[]) => dispatch(setGenres(genres))}
            maw={{ base: '218px', sm: '284px' }}
            flex='1 1 100%'
            w={'100%'}
            label={<Title order={5}>Genres</Title>}
            placeholder={selectedGenres.length ? '' : 'Select genre'}
            data={data?.genres}
            value={selectedGenres}
            rightSection={isLoading ? <Loader size='xs' /> : <ChevronIcon />}
            withCheckIcon={false}
            classNames={{
                root: commonClasses.filterRoot,
                wrapper: commonClasses.filterWrapper,
                input: commonClasses.inputRoot,
                label: commonClasses.filterLabel,
                dropdown: commonClasses.selectDropdown,
                option: commonClasses.selectOption,
                pill: classes.pill,
                pillsList: classes.pillsList,
            }}
        />
    );
};
export default GenresFilter