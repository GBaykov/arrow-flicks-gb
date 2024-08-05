import { useAppDispatch, useAppSelector } from "@/hooks";
import { filtersSelector, setPage } from "@/redux/reducers/filtersSlice";
import { useGetMoviesQuery } from "@/redux/services/moviesService";
import { Loader, SimpleGrid, Stack } from "@mantine/core";

import { FC } from "react";

import { EmptyData } from "@/constants/empty";

import { AppPagination } from "../pagination/AppPagination";
import FilmCard from "../FilmCard/FilmCard";
import EmptyStateMessage from "../emptyStateMessage";

const CardField: FC = () => {
  const { selectedGenres, selectedYear, ratingFrom, ratingTo, sortBy, page } =
    useAppSelector(filtersSelector);

  const dispatch = useAppDispatch();

  const setCurrentPage = (currentPage: number) => {
    dispatch(setPage(currentPage));
  };

  const { data: movies, isFetching } = useGetMoviesQuery({
    selectedGenres,
    selectedYear,
    ratingFrom,
    ratingTo,
    sortBy,
    page,
  });

  if (!movies?.results.length && !isFetching) {
    return <EmptyStateMessage info={EmptyData.data_not_found} />;
  }

  if (isFetching) {
    return (
      <Stack gap="md" w="100%" align="center">
        <Loader size="xl" />
      </Stack>
    );
  }

  return (
    <>
      <SimpleGrid cols={{ base: 1, xs: 2 }}>
        {movies &&
          movies.results.map((item) => {
            return <FilmCard key={item?.id} movie_info={item} />;
          })}
      </SimpleGrid>{" "}
      <AppPagination
        page={page}
        setPage={setCurrentPage}
        align="right"
        totalPages={Math.min(movies?.total_pages || 1, 500)}
        isLoading={isFetching}
      />
    </>
  );
};
export default CardField;
