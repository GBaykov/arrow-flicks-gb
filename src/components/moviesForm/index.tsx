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

import { appFilters, appSortBy, setAppFilters } from '@redux/reducers/appSlice';
import { genreList, moviesPage } from '@redux/reducers/moviesSlice';
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
    const sort_by = useAppSelector(appSortBy);
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

        validate: {
            vote_average_lte: isInRange({ min: 1, max: 3 }, 'Value must be between 1 and 3'),

            vote_average_gte: isInRange({ min: 4, max: 6 }, 'Value must be between 4 and 6'),
        },

        onValuesChange: (values: FormFilters) => {
            form.validate();
            console.log(form.validate);
            form.isValid();
            console.log(form.isValid());
            if (Object.getOwnPropertyNames(form.errors).length === 0) {
                const { genre_names, primary_release_year } = values;

                const with_genres = getGenreIdsByLabels(genres, genre_names);
                const formFilters = {
                    with_genres,
                    primary_release_year,
                    'vote_average.lte': values['vote_average_lte'],
                    'vote_average.gte': values['vote_average_gte'],
                };

                dispatch(setAppFilters(formFilters));

                const args = moviesArgsConstructor(formFilters, page, sort_by);
                console.log(args);
                getMovies(args);
            } else console.log(form.errors);
        },
    });

    return (
        <Stack>
            <form>
                <Flex>
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
                    <Group>
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
                        onClick={() => form.reset()}
                        variant='transparent'
                        c={theme.colors.gray[6]}
                    >
                        Reset filters
                    </Button>
                </Flex>
            </form>
            <Select
                label='Sort by'
                data={sortData.map((item) => item.label)}
                defaultValue={SortTypes.MostPopular}
            />
        </Stack>
    );
};
