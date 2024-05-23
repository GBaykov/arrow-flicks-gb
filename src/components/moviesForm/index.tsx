import {
    getGenreIdsByLabels,
    getGenreLabelsByIds,
    getMoviesYears,
    moviesArgsConstructor,
} from '@components/utils';
import { SortTypes } from '@constants/enums';
import { sortData } from '@constants/general';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    Button,
    Group,
    NumberInput,
    MultiSelect,
    Stack,
    Select,
    useMantineTheme,
    Flex,
} from '@mantine/core';
import { UseFormReturnType, isInRange, useForm } from '@mantine/form';

import {
    appFilters,
    appSortBy,
    setAppFilters,
    setAppSortBy,
    setResetFilters,
} from '@redux/reducers/appSlice';
import { genreList, moviesPage, setPage } from '@redux/reducers/moviesSlice';
import { useLazyGetMoviesQuery } from '@redux/services/moviesService';
import { FC } from 'react';

export type FormFilters = {
    genre_names: string[];
    primary_release_year: string;
    vote_average_gte: number | null;
    vote_average_lte: number | null;
};

export const MoviesForm: FC = () => {
    const dispatch = useAppDispatch();
    const page = useAppSelector(moviesPage);
    const filters = useAppSelector(appFilters);
    const sortBy = useAppSelector(appSortBy);
    const [getMovies] = useLazyGetMoviesQuery();
    const theme = useMantineTheme();
    const genres = useAppSelector(genreList);
    const genreListNames = genres.map((item) => item.name);
    const releaseYearsData = getMoviesYears();
    const genreLabels = getGenreLabelsByIds(genres, filters.with_genres);

    const form: UseFormReturnType<FormFilters> = useForm({
        mode: 'uncontrolled',
        validateInputOnChange: true,
        initialValues: {
            genre_names: genreLabels,
            primary_release_year: filters.primary_release_year,
            vote_average_lte: filters['vote_average.lte'],
            vote_average_gte: filters['vote_average.gte'],
        },

        onValuesChange: (values: FormFilters) => {
            form.validate();
            if (Object.getOwnPropertyNames(form.errors).length === 0) {
                const { genre_names, primary_release_year } = values;
                const with_genres = getGenreIdsByLabels(genres, genre_names);
                const formFilters = {
                    with_genres,
                    primary_release_year,
                    'vote_average.lte': values['vote_average_lte'],
                    'vote_average.gte': values['vote_average_gte'],
                };
                const sort_by = sortData.find((item) => item.label === sortBy)?.name;
                const page = 1;
                dispatch(setPage(page));

                dispatch(setAppFilters(formFilters));

                const args = moviesArgsConstructor(formFilters, page, sort_by);

                getMovies(args);
            } else console.log(form.errors);
        },
    });

    const onSortSelect = (value: string | null) => {
        const { genre_names, primary_release_year } = form.values;
        const with_genres = getGenreIdsByLabels(genres, genre_names);
        const formFilters = {
            with_genres,
            primary_release_year,
            'vote_average.lte': form.values['vote_average_lte'],
            'vote_average.gte': form.values['vote_average_gte'],
        };

        const sorValue = value as SortTypes;
        const sort_by = sortData.find((item) => item.label === sorValue)?.name;

        dispatch(setAppSortBy(sorValue));

        const args = moviesArgsConstructor(formFilters, page, sort_by);

        getMovies(args);
    };
    const onResetClick = () => {
        form.reset();
        dispatch(setResetFilters());
    };

    return (
        <Stack>
            <form>
                <Flex gap={'md'} align={'flex-end'}>
                    <MultiSelect
                        label='Genres'
                        placeholder='Select genre'
                        data={genreListNames}
                        key={form.key('genre_names')}
                        {...form.getInputProps('genre_names')}
                    />
                    <Select
                        label='Release year'
                        placeholder='Select release year'
                        data={releaseYearsData}
                        key={form.key('primary_release_year')}
                        {...form.getInputProps('primary_release_year')}
                    />
                    <Group gap={'xs'}>
                        <NumberInput
                            label='Ratings'
                            placeholder='From'
                            min={1}
                            max={form.values.vote_average_lte || 10}
                            allowNegative={false}
                            clampBehavior='strict'
                            key={form.key('vote_average_gte')}
                            {...form.getInputProps('vote_average_gte')}
                        />
                        <NumberInput
                            label=' '
                            placeholder='To'
                            min={form.values.vote_average_gte || 1}
                            max={10}
                            allowNegative={false}
                            clampBehavior='strict'
                            key={form.key('vote_average_lte')}
                            {...form.getInputProps('vote_average_lte')}
                        />
                    </Group>
                    <Button
                        onClick={() => onResetClick()}
                        variant='transparent'
                        c={theme.colors.gray[6]}
                    >
                        Reset filters
                    </Button>
                </Flex>
            </form>
            <Flex justify={'flex-end'} w={'100%'}>
                <Select
                    onChange={(v) => onSortSelect(v)}
                    maw={'284px'}
                    label='Sort by'
                    data={sortData.map((item) => item.label)}
                    defaultValue={sortBy}
                />
            </Flex>
        </Stack>
    );
};
