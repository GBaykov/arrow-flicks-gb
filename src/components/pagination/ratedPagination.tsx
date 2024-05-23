import { FC, useEffect, useState } from 'react';
import { randomId } from '@mantine/hooks';
import { Group, Pagination, Text } from '@mantine/core';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appModal } from '@redux/reducers/appSlice';
import { MovieItem, StoragedItem } from '@redux/appTypes';
import { CardField } from '@components/cardField';
import { MAX_CARDS_PER_RATEDPAGE } from '@constants/general';
import classes from './AppPagination.module.css';

function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
        return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
}

export const RatedPagination: FC = () => {
    const chosenMovie = useAppSelector(appModal);
    const storagedRated = localStorage.getItem('rated');
    const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];
    const movieList: MovieItem[] = ratedMovies.map((item) => item.movie);

    const [isRatedList, seIsRatedList] = useState(Boolean(movieList.length > 0));
    const [activePage, setPage] = useState(1);
    const ratedData = chunk(movieList, 4);

    const itemsONPage = ratedData[activePage - 1];

    useEffect(() => {
        const storagedRated = localStorage.getItem('rated');
        const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];
        const movieList: MovieItem[] = ratedMovies.map((item) => item.movie);
        const ratedData = chunk(movieList, MAX_CARDS_PER_RATEDPAGE);

        const itemsPerPage = ratedData[activePage - 1];
        seIsRatedList(Boolean(itemsPerPage.length > 0));
    }, [chosenMovie]);

    const getProps = (page: number) => {
        const result: Record<string, string> = {
            'data-pagination-page': String(page),
        };
        return result;
    };

    const isFirstPagesOffset = activePage === 1 || activePage === 2 || activePage === 3;

    return (
        <>
            {isRatedList && (
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
