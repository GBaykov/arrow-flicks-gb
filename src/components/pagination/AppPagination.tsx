import { sortData } from '@constants/general';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Group, Pagination } from '@mantine/core';

import { FC } from 'react';
import classes from './AppPagination.module.css';
import { useDispatch } from 'react-redux';
import { appFilters, appSortBy } from '@redux/reducers/appSlice';
import { moviesArgsConstructor } from '@components/utils';
import { useLazyGetMoviesQuery } from '@redux/services/moviesService';
import { filtersPage, setPage } from '@redux/reducers/filtersSlice';

export type AppPaginationProps = {
    page: number;
    setPage: (page: number) => void;
    align: 'center' | 'right';
    totalPages?: number;
    isLoading?: boolean;
};

export const AppPagination: FC<AppPaginationProps> = ({
    page,
    setPage,
    align,
    totalPages,
    isLoading,
}) => {
    // const dispatch = useDispatch();
    // const moviePage = useAppSelector(filtersPage);
    // const totalPages = pages;

    const getControlsVisibility = (pageNumber: number) => {
        const leftCutoff = Math.max(1, page === totalPages ? page - 2 : page - 1);
        const rightCutoff = Math.min(totalPages || 1, page === 1 ? 3 : page + 1);

        if (pageNumber < leftCutoff || pageNumber > rightCutoff) {
            return {
                display: 'none',
            };
        }
        return {};
    };
    // const onPageChange = (page: number) => {
    //     dispatch(setPage(page));

    // };

    return (
        <div>
            {
                <Pagination.Root
                    onChange={setPage}
                    value={page}
                    classNames={{
                        root: classes.root,
                        dots: classes.dots,
                        control: classes.control,
                    }}
                    total={Math.min(totalPages || 1, 500)}
                    boundaries={0}
                    getItemProps={(page) => getControlsVisibility(page)}
                    siblings={1}
                    mt={'xl'}
                    styles={{
                        root: {
                            justifyContent: align === 'center' ? 'center' : 'flex-end',
                        },
                    }}
                    disabled={isLoading}
                >
                    <Group gap={8} justify='flex-end'>
                        <Pagination.Previous />
                        <Pagination.Items />

                        <Pagination.Next />
                    </Group>
                </Pagination.Root>
            }
        </div>
    );
};
