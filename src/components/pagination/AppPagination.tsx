import { sortData } from '@constants/general';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Group, Pagination } from '@mantine/core';
import { moviesPage, setPage } from '@redux/reducers/moviesSlice';
import { FC } from 'react';
import classes from './AppPagination.module.css';
import { useDispatch } from 'react-redux';
import { appFilters, appSortBy } from '@redux/reducers/appSlice';
import { moviesArgsConstructor } from '@components/utils';
import { useLazyGetMoviesQuery } from '@redux/services/moviesService';

export type AppPaginationProps = {
    pages: number;
};

export const AppPagination: FC<AppPaginationProps> = ({ pages }) => {
    const dispatch = useDispatch();
    const filters = useAppSelector(appFilters);
    const sortBy = useAppSelector(appSortBy);
    const moviePage = useAppSelector(moviesPage);
    const [getMovies] = useLazyGetMoviesQuery();
    const totalPages = pages;

    const getProps = (page: number) => {
        const result: Record<string, string> = {
            'data-pagination-page': String(page),
        };
        return result;
    };

    const isFirstPagesOffset = moviePage === 1 || moviePage === 2 || moviePage === 3;

    const onPageChange = (page: number) => {
        dispatch(setPage(page));
        const sort_by = sortData.find((item) => item.label === sortBy)?.name;
        const args = moviesArgsConstructor(filters, page, sort_by);
        getMovies(args);
    };

    return (
        <div>
            {isFirstPagesOffset && (
                <Pagination.Root
                    onChange={(page) => onPageChange(page)}
                    value={moviePage}
                    classNames={{
                        root: classes.root,
                        dots: classes.dots,
                        control: classes.control,
                    }}
                    total={totalPages}
                    boundaries={0}
                    getItemProps={(page) => getProps(page)}
                    siblings={1}
                    mt={'xl'}
                >
                    <Group gap={5} justify='flex-end'>
                        <Pagination.Previous />
                        <Pagination.Items />

                        <Pagination.Next />
                    </Group>
                </Pagination.Root>
            )}
            {!isFirstPagesOffset && (
                <Pagination.Root
                    onChange={(page) => onPageChange(page)}
                    value={moviePage}
                    classNames={{
                        root: classes.root,
                        dots: classes.dots,
                    }}
                    total={totalPages}
                    boundaries={0}
                    getItemProps={(page) => getProps(page)}
                    siblings={1}
                    mt={'xl'}
                >
                    <Group gap={5} justify='flex-end'>
                        <Pagination.Previous />
                        <Pagination.Items />

                        <Pagination.Next />
                    </Group>
                </Pagination.Root>
            )}
        </div>
    );
};
