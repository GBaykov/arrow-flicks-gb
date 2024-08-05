"use client";

import FilmCard from "@/components/FilmCard/FilmCard";
import SearchField from "@/components/SearchField/SearchField";
import EmptyStateMessage from "@/components/emptyStateMessage";

import { AppPagination } from "@/components/pagination/AppPagination";
import { chunk } from "@/components/utils";
import { EmptyData } from "@/constants/empty";
import { MAX_CARDS_PER_RATEDPAGE } from "@/constants/general";
import { useAppSelector } from "@/hooks";

import { MovieItem, StoragedItem } from "@/redux/appTypes";
import { Group, SimpleGrid, Title } from "@mantine/core";
import { useEffect, useState } from "react";

const RatedPage = () => {
  const [value, setValue] = useState("");
  const chosenMovie = useAppSelector((state) => state.app.movieForModal);

  const storagedRated =
    typeof window !== "undefined" ? localStorage.getItem("rated") : "";
  const ratedMovies: StoragedItem[] = storagedRated
    ? JSON.parse(storagedRated)
    : [];

  const movieList: (MovieItem | any)[] =
    ratedMovies.map((item) => item.movie_info) || [];
  const [isRatedList, seIsRatedList] = useState(Boolean(movieList?.length > 0));
  const [ratedSearchedMovies, setRatedSearchedMovies] = useState(movieList);

  const [activePage, setActivePage] = useState(1);
  const totalPages = Math.ceil(
    ratedSearchedMovies.length / MAX_CARDS_PER_RATEDPAGE
  );

  const ratedData = chunk(ratedSearchedMovies, MAX_CARDS_PER_RATEDPAGE);
  const itemsONPage = ratedData[activePage - 1];

  const setPage = (page: number) => {
    setActivePage(page);
  };

  const submitHandler = () => {
    const result = movieList.filter((movie) =>
      movie?.original_title.toLowerCase().includes(value.toLowerCase())
    );
    setRatedSearchedMovies(result);

    setActivePage(1);
  };

  useEffect(() => {
    const chosenMovies = movieList.filter((movie) =>
      movie?.original_title.toLowerCase().includes(value.toLowerCase())
    );
    setRatedSearchedMovies(chosenMovies);
    seIsRatedList(Boolean(movieList.length > 0));
  }, [movieList.length, chosenMovie]);

  useEffect(() => {
    if (activePage > totalPages) {
      setActivePage(totalPages);
    }
  }, [totalPages]);

  return (
    <>
      {!isRatedList && <EmptyStateMessage info={EmptyData.emty} />}
      {isRatedList && (
        <>
          {" "}
          <Group
            justify={"space-between"}
            mb={{ base: 20, sm: 40 }}
            align={"baseline"}
          >
            {" "}
            <Title order={1}>Rated movies</Title>
            <SearchField
              value={value}
              setValue={setValue}
              onSearchSubmit={submitHandler}
            />
          </Group>
          {!ratedSearchedMovies.length ? (
            <EmptyStateMessage info={EmptyData.data_not_found} />
          ) : (
            <>
              <SimpleGrid cols={{ base: 1, xs: 2 }}>
                {itemsONPage &&
                  itemsONPage.map((item) => {
                    return <FilmCard key={item?.id} movie_info={item} />;
                  })}
              </SimpleGrid>{" "}
              <AppPagination
                page={activePage}
                setPage={setPage}
                align="center"
                totalPages={Math.min(totalPages, 500)}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default RatedPage;
