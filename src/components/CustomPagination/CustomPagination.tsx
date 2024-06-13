import { Pagination } from '@mantine/core';

import classes from './CustomPagination.module.css';

interface CustomPaginationProps {
  page: number;
  setPage: (page: number) => void;
  align: 'center' | 'right';
  totalPages?: number;
  isLoading?: boolean;
}

const CustomPagination = (props: CustomPaginationProps) => {
  const { page, setPage, align, totalPages, isLoading } = props;

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
    <Pagination
      value={page}
      onChange={setPage}
      total={Math.min(totalPages || 1, 500)}
      radius="sm"
      classNames={{
        root: classes.root,
        control: classes.control,
        dots: classes.dots,
      }}
      styles={{
        root: {
          justifyContent: align === 'center' ? 'center' : 'flex-end',
        },
      }}
      getItemProps={getControlsVisibility}
      disabled={isLoading}
    />
  );
};

export default CustomPagination;
