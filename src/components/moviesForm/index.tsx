import {
    getGenreIdsByLabels,
    getGenreLabelsByIds,
    getMoviesYears,
    moviesArgsConstructor,
} from '@components/utils';
import { SortTypes } from '@constants/enums';
import { sortData } from '@constants/general';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Button, Group, NumberInput, MultiSelect, Stack, Select, Flex, Title } from '@mantine/core';
import { UseFormReturnType, useForm } from '@mantine/form';

import {
    formToched,
    appFilters,
    appSortBy,
    setAppFilters,
    setAppSortBy,
    setFormToched,
    setResetFilters,
} from '@redux/reducers/appSlice';
import { genreList, moviesPage, setPage } from '@redux/reducers/moviesSlice';
import { useGetGenreListQuery, useLazyGetMoviesQuery } from '@redux/services/moviesService';
import { FC } from 'react';
import button_classes from '../../modules.styles/Button.module.css';
import inputs_classes from '../../modules.styles/Inputs.module.css';

import UpDown from '../../assets/icons/UpDown.svg';
import downIcon from '../../assets/icons/down.svg';

export type FormFilters = {
    genre_names: string[];
    primary_release_year: string;
    vote_average_gte: number | null;
    vote_average_lte: number | null;
};

export const MoviesForm: FC = () => {
    const { data, isLoading } = useGetGenreListQuery();
    console.log(data, isLoading);
    const dispatch = useAppDispatch();
    const page = useAppSelector(moviesPage);
    const filters = useAppSelector(appFilters);
    const sortBy = useAppSelector(appSortBy);
    const [getMovies] = useLazyGetMoviesQuery();
    const genres = useAppSelector(genreList);
    const genreListNames = genres.map((item) => item.name);
    const releaseYearsData = getMoviesYears();
    const genreLabels = getGenreLabelsByIds(genres, filters.with_genres);
    const isFormToched = useAppSelector(formToched);

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
            dispatch(setFormToched(true));
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
                const sort_by = sortData.find((item) => item.label === sortBy)?.label;
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
        const sort_by = sortData.find((item) => item.label === sorValue)?.label;

        dispatch(setAppSortBy(sorValue));

        const args = moviesArgsConstructor(formFilters, page, sort_by);

        getMovies(args);
    };
    const onResetClick = () => {
        form.reset();
        dispatch(setResetFilters());
        dispatch(setFormToched(false));
    };
    console.log(form.values.genre_names);
    return (
        <Stack mb={{ base: 'xs', xs: 'sm', sm: 'md' }} gap={'xl'}>
            <form>
                <Flex gap={'md'} align={'flex-end'} wrap={{ base: 'wrap', sm: 'nowrap' }}>
                    <MultiSelect
                        maw={'284px'}
                        w={'100%'}
                        label={<Title order={5}>Genres</Title>}
                        // placeholder='Select genre'
                        placeholder={!form.values.genre_names.length ? 'Select genre' : ''}
                        data={genreListNames}
                        key={form.key('genre_names')}
                        {...form.getInputProps('genre_names')}
                        rightSection={<img src={downIcon} />}
                        withCheckIcon={false}
                        classNames={{
                            option: inputs_classes.selectOption,
                            inputField: inputs_classes.selectInput,
                            section: inputs_classes.selectSection,
                            pill: inputs_classes.multiPill,
                            pillsList: inputs_classes.multiPillList,
                        }}
                    />
                    <Select
                        maw={'300px'}
                        w={{ base: '', sm: '100%' }}
                        label={<Title order={5}>Release year</Title>}
                        placeholder='Select release year'
                        data={releaseYearsData}
                        key={form.key('primary_release_year')}
                        {...form.getInputProps('primary_release_year')}
                        rightSection={<img src={downIcon} />}
                        withCheckIcon={false}
                        classNames={{
                            option: inputs_classes.selectOption,
                            input: inputs_classes.selectInput,
                            section: inputs_classes.selectSection,
                        }}
                    />
                    <Group gap={'xs'} maw={'284px'} w={'100%'} wrap='nowrap'>
                        {' '}
                        <NumberInput
                            label={<Title order={5}>Ratings</Title>}
                            placeholder='From'
                            min={1}
                            max={form.values.vote_average_lte || 10}
                            allowNegative={false}
                            clampBehavior='strict'
                            key={form.key('vote_average_gte')}
                            {...form.getInputProps('vote_average_gte')}
                            classNames={{
                                input: button_classes.numberInput,
                                wrapper: button_classes.numberWrapper,
                                controls: button_classes.numberControl,
                            }}
                            rightSection={<img src={UpDown} />}
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
                            classNames={{
                                root: button_classes.transparentRoot,
                                wrapper: button_classes.numberWrapper,
                                control: button_classes.numberControl,
                            }}
                            rightSection={<img src={UpDown} />}
                        />
                    </Group>
                    <Button
                        classNames={{
                            root: button_classes.transparentRoot,
                        }}
                        p={0}
                        maw={'82px'}
                        w={'100%'}
                        onClick={() => onResetClick()}
                        variant='transparent'
                        disabled={!isFormToched}
                    >
                        Reset filters
                    </Button>
                </Flex>
            </form>
            <Flex justify={{ base: 'flex-start', sm: 'flex-end' }} w={'100%'}>
                <Select
                    onChange={(v) => onSortSelect(v)}
                    maw={'284px'}
                    label={<Title order={5}>Sort by</Title>}
                    data={sortData.map((item) => item.label)}
                    defaultValue={sortBy}
                    rightSection={<img src={downIcon} />}
                    withCheckIcon={false}
                    classNames={{
                        option: inputs_classes.selectOption,
                        input: inputs_classes.selectInput,
                        section: inputs_classes.selectSection,
                    }}
                />
            </Flex>
        </Stack>
    );
};
