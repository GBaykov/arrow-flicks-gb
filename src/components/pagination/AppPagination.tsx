import { MAX_PAGES_COUNT, sortData } from '@constants/general';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Group, Pagination } from '@mantine/core';
import { usePagination } from '@mantine/hooks';
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
    const totalPages = pages <= MAX_PAGES_COUNT ? pages : MAX_PAGES_COUNT;

    const getProps = (page: number) => {
        const result: Record<string, string> = {
            'data-pagination-page': String(page),
        };
        return result;
    };

    const isFirstLastPagesOffset =
        moviePage === 1 ||
        moviePage === 2 ||
        moviePage === 3 ||
        moviePage === String(totalPages).length - 1 ||
        moviePage === String(totalPages).length - 2 ||
        moviePage === String(totalPages).length - 3;
    console.log(isFirstLastPagesOffset, moviePage);

    const onPageChange = (page: number) => {
        dispatch(setPage(page));
        const sort_by = sortData.find((item) => item.label === sortBy)?.name;
        const args = moviesArgsConstructor(filters, page, sort_by);
        getMovies(args);
    };

    return (
        <div>
            {isFirstLastPagesOffset && (
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
                >
                    <Group gap={5} justify='center'>
                        <Pagination.Previous />
                        <Pagination.Items />

                        <Pagination.Next />
                    </Group>
                </Pagination.Root>
            )}
            {!isFirstLastPagesOffset && (
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
                >
                    <Group gap={5} justify='center'>
                        <Pagination.Previous />
                        <Pagination.Items />

                        <Pagination.Next />
                    </Group>
                </Pagination.Root>
            )}
        </div>
    );
};
