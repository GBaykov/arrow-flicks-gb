import { FC } from 'react';

import { Group, Pagination } from '@mantine/core';

import { MovieItem } from '@redux/appTypes';
import { CardField } from '@components/cardField';
import { MAX_CARDS_PER_RATEDPAGE } from '@constants/general';
import classes from './AppPagination.module.css';
import { EmptyStateMessage } from '@components/emptyStateMessage';
import { EmptyData } from '@constants/empty';

function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
        return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
}

export type RatedPaginationProps = {
    movieList: MovieItem[];
    setPage: (page: number) => void;
    activePage: number;
};

export const RatedPagination: FC<RatedPaginationProps> = ({ movieList, setPage, activePage }) => {
    const ratedData = chunk(movieList, MAX_CARDS_PER_RATEDPAGE);
    const itemsONPage = ratedData[activePage - 1];

    const isSearchedRated = movieList.length < 1;
    const getProps = (page: number) => {
        const result: Record<string, string> = {
            'data-pagination-page': String(page),
        };
        return result;
    };

    const isFirstPagesOffset = activePage === 1 || activePage === 2 || activePage === 3;

    return (
        <>
            {isSearchedRated && <EmptyStateMessage info={EmptyData.data_not_found} />}
            {!isSearchedRated && (
                <>
                    <CardField movies={itemsONPage} />{' '}
                    {movieList.length > MAX_CARDS_PER_RATEDPAGE && isFirstPagesOffset && (
                        <Pagination.Root
                            siblings={1}
                            boundaries={0}
                            total={ratedData.length}
                            value={activePage}
                            onChange={setPage}
                            mt='xl'
                            classNames={{
                                root: classes.root,
                                dots: classes.dots,
                                control: classes.control,
                            }}
                            getItemProps={(page) => getProps(page)}
                        >
                            <Group gap={5} justify='center'>
                                <Pagination.Previous />
                                <Pagination.Items />

                                <Pagination.Next />
                            </Group>
                        </Pagination.Root>
                    )}
                    {movieList.length > MAX_CARDS_PER_RATEDPAGE && !isFirstPagesOffset && (
                        <Pagination.Root
                            siblings={1}
                            boundaries={0}
                            total={ratedData.length}
                            value={activePage}
                            onChange={setPage}
                            mt='xl'
                            classNames={{
                                root: classes.root,
                                dots: classes.dots,
                            }}
                            getItemProps={(page) => getProps(page)}
                        >
                            <Group gap={5} justify='center'>
                                <Pagination.Previous />
                                <Pagination.Items />

                                <Pagination.Next />
                            </Group>
                        </Pagination.Root>
                    )}
                </>
            )}
        </>
    );
};
