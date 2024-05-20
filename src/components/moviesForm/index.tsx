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

export type FormValuesType = {
    genres: string;
    years: string;
    from: string;
    to: string;
};

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
        mode: 'uncontrolled',
        initialValues: {
            with_genres: [''],
            primary_release_year: '',
            'vote_average.lte': 0,
            'vote_average.gte': 0,
        },

        validate: {
            'vote_average.lte': (value) =>
                Number(value) >= 1 && Number(value) <= Number(form.getValues()['vote_average.gte'])
                    ? null
                    : 'Сhoose correct year',

            'vote_average.gte': (value) =>
                Number(value) >= Number(form.getValues()['vote_average.lte']) && Number(value) <= 10
                    ? null
                    : 'Сhoose correct year',
        },
    });
    const onFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.validate();
        dispatch(setAppFilters(form.values));
    };

    useEffect(() => {
        if (!form.errors) {
            const args = moviesArgsConstructor(filters, page, sort_by);
            getMovies(args);
        }
    }, [page, filters, sort_by]);

    return (
        <form onChange={onFormChange} onSubmit={(e) => onFormChange(e)}>
            <Flex>
                <MultiSelect
                    label='Genres'
                    placeholder='Select genre'
                    data={genreListNames}
                    key={form.key('genres')}
                    {...form.getInputProps('genres')}
                />
                <Select
                    label='Release year'
                    placeholder='Select release year'
                    data={releaseYearsData}
                    key={form.key('years')}
                    {...form.getInputProps('years')}
                />
                <Stack>
                    <NumberInput
                        label='Ratings'
                        placeholder='From'
                        key={form.key('from')}
                        {...form.getInputProps('from')}
                    />
                    <NumberInput
                        placeholder='To'
                        key={form.key('to')}
                        {...form.getInputProps('to')}
                    />
                </Stack>
                <Button onClick={() => form.reset()} variant='transparent' c={theme.colors.gray[6]}>
                    Reset filters
                </Button>
            </Flex>

            {/* <TextInput
                    withAsterisk
                    label='Email'
                    placeholder='your@email.com'
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                /> */}
            {/* <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          key={form.key('termsOfService')}
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        /> */}
        </form>
    );
};
