import { Group, Pagination } from '@mantine/core';

import { FC } from 'react';
import classes from './AppPagination.module.css';

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
