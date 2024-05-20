import { getMoviesYears, moviesArgsConstructor } from '@components/utils';
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

export const MoviesForm: FC = () => {
    const dispatch = useAppDispatch();
    const page = useAppSelector(moviesPage);
    const filters = useAppSelector(appFilters);
    const sort_by = useAppSelector(appSortBy);
    const [getMovies] = useLazyGetMoviesQuery();
    const theme = useMantineTheme();
    const genreListNames = useAppSelector(genreList).map((item) => item.name);
    const releaseYearsData = getMoviesYears();
    const form: UseFormReturnType<AppFilters> = useForm({
        mode: 'controlled',
        initialValues: {
            with_genres: [],
            primary_release_year: '',
            'vote_average.lte': 0,
            'vote_average.gte': 0,
        },

        onValuesChange: (values: AppFilters) => {
            console.log(values);
            form.validate();
            dispatch(setAppFilters(values));
        },

        // validate: {
        //     'vote_average.lte': (value) =>
        //         Number(value) >= 1 && Number(value) <= Number(form.getValues()['vote_average.gte'])
        //             ? null
        //             : 'Сhoose correct year',

        //     'vote_average.gte': (value) =>
        //         Number(value) >= Number(form.getValues()['vote_average.lte']) && Number(value) <= 10
        //             ? null
        //             : 'Сhoose correct year',
        // },
    });

    const onFormChange = (values: AppFilters, event?: React.FormEvent<HTMLFormElement>) => {
        console.log(event, values);
        event?.preventDefault();
        form.validate();
        dispatch(setAppFilters(values));
    };

    useEffect(() => {
        console.log(form.errors);
        if (!form.errors) {
            const args = moviesArgsConstructor(filters, page, sort_by);
            getMovies(args);
        }
    }, [filters, sort_by]);

    useEffect(() => {
        console.log(form.errors);
        if (!form.errors) {
            const args = moviesArgsConstructor(filters, page, sort_by);
            getMovies(args);
        }
    }, [filters]);

    return (
        <form
            onChange={form.onSubmit((values, event) => onFormChange(values, event))}
            onSubmit={form.onSubmit((values, event) => onFormChange(values, event))}
            // onSubmit={(e) => onFormChange(e)}
        >
            <Flex>
                <MultiSelect
                    label='Genres'
                    placeholder='Select genre'
                    data={genreListNames}
                    key={form.key('with_genres')}
                    {...form.getInputProps('with_genres')}
                />
                <Select
                    label='Release year'
                    placeholder='Select release year'
                    data={releaseYearsData}
                    key={form.key('primary_release_year')}
                    {...form.getInputProps('primary_release_year')}
                />
                <Stack>
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
                </Stack>
                <Button onClick={() => form.reset()} variant='transparent' c={theme.colors.gray[6]}>
                    Reset filters
                </Button>
            </Flex>

            <Group justify='flex-end' mt='md'>
                <Button type='submit'>Submit</Button>
            </Group>
        </form>
    );
};