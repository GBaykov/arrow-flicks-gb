import {
    getGenreIdsByLabels,
    getGenreLabelsByIds,
    getMoviesYears,
    moviesArgsConstructor,
} from '@components/utils';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    TextInput,
    Checkbox,
    Button,
    Group,
    Box,
    NumberInput,
    MultiSelect,
    Stack,
    Select,
    useMantineTheme,
    Flex,
} from '@mantine/core';
import { UseFormReturnType, useForm } from '@mantine/form';
import { AppFilters } from '@redux/appTypes';
import { appFilters, appSelector, appSortBy, setAppFilters } from '@redux/reducers/appSlice';
import { genreList, moviesPage } from '@redux/reducers/moviesSlice';
import { useGetMoviesQuery, useLazyGetMoviesQuery } from '@redux/services/moviesService';
import { FC, useEffect } from 'react';

export type FormFilters = {
    genre_names: string[];
    primary_release_year: string;
    vote_average: {
        lte: number;
        gte: number;
    };
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
        mode: 'controlled',
        initialValues: {
            genre_names: genreLabels,
            primary_release_year: filters.primary_release_year,
            vote_average: {
                lte: filters['vote_average.lte'],
                gte: filters['vote_average.gte'],
            },
        },

        onValuesChange: (values: FormFilters) => {
            form.validate();
            console.log(values);
            const { genre_names, primary_release_year, vote_average } = values;

            const with_genres = getGenreIdsByLabels(genres, genre_names);
            const formFilters = {
                with_genres,
                primary_release_year,
                'vote_average.lte': vote_average.lte,
                'vote_average.gte': vote_average.gte,
            };

            dispatch(setAppFilters(formFilters));

            if (Object.getOwnPropertyNames(form.errors).length === 0) {
                const args = moviesArgsConstructor(formFilters, page, sort_by);
                console.log(args);
                getMovies(args);
            } else console.log(form.errors);
        },

        validate: {
            vote_average: (value) =>
                Number(value.lte) >= 0 &&
                Number(value.lte) <= Number(value.gte) &&
                Number(value.gte) <= 10
                    ? null
                    : 'Сhoose correct rate',
        },
    });

    // const onFormChange = (values: AppFilters, event?: React.FormEvent<HTMLFormElement>) => {
    //     console.log(event, values);
    //     event?.preventDefault();
    //     form.validate();
    //     dispatch(setAppFilters(values));
    // };
    // console.log(form.values);

    // useEffect(() => {
    //     console.log(form.errors);
    //     if (Object.getOwnPropertyNames(form.errors).length === 0) {
    //         const args = moviesArgsConstructor(filters, page, sort_by);
    //         getMovies(args);
    //     }
    // }, [filters, page, sort_by]);

    return (
        <form
        // onChange={form.onSubmit((values, event) => onFormChange(values, event))}
        // onSubmit={form.onSubmit((values, event) => onFormChange(values, event))}
        // onSubmit={(e) => onFormChange(e)}
        >
            <Flex>
                <MultiSelect
                    label='Genres'
                    placeholder='Select genre'
                    data={genreListNames}
                    key={form.key('genre_names')}
                    // {...form.getInputProps('genre_names')}
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
                        key={form.key('vote_average.lte')}
                        {...form.getInputProps('vote_average.lte')}
                    />
                    <NumberInput
                        placeholder='To'
                        key={form.key('vote_average.gte')}
                        {...form.getInputProps('vote_average.gte')}
                    />
                </Group>
                <Button onClick={() => form.reset()} variant='transparent' c={theme.colors.gray[6]}>
                    Reset filters
                </Button>
            </Flex>
        </form>
    );
};
