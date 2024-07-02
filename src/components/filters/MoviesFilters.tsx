"use client";

import { useEffect, useState } from "react";
import { Button, Flex, Stack } from "@mantine/core";

import RatingsFilter from "./RatingsFilter/RatingsFilter";
import classes from "@/styles/MoviesFilters.module.css";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { resetFilters } from "@/redux/reducers/filtersSlice";

import ReleaseYearFilter from "./ReleaseYearFilter/ReleaseYearFilter";
import SortBy from "./SortBy/SortBy";
import GenresFilter from "./GenresFilter/GenresFilter";

const MoviesFilters = () => {
  const dispatch = useAppDispatch();
  const { selectedGenres, selectedYear, ratingFrom, ratingTo } = useAppSelector(
    (state) => state.filters
  );
  const [allFiltersEmpty, setAllFiltersEmpty] = useState(false);

  useEffect(() => {
    setAllFiltersEmpty(
      selectedGenres.length === 0 &&
        selectedYear === null &&
        ratingFrom === undefined &&
        ratingTo === undefined
    );
  }, [selectedGenres, selectedYear, ratingFrom, ratingTo]);

  return (
    <Stack mb={{ base: "xs", xs: "sm", sm: "md" }} gap={"xl"}>
      <Flex
        gap={{ base: "xs", xs: "md" }}
        align={"flex-end"}
        wrap={{ base: "wrap", sm: "nowrap" }}
      >
        <GenresFilter />
        <ReleaseYearFilter />
        <RatingsFilter />
        <Button
          variant="transparent"
          className={classes.resetButton}
          onClick={() => dispatch(resetFilters())}
          disabled={allFiltersEmpty}
        >
          Reset filters
        </Button>
      </Flex>
      <Flex justify={{ base: "flex-start", sm: "flex-end" }} w={"100%"}>
        <SortBy />
      </Flex>
    </Stack>
  );
};
export default MoviesFilters;
