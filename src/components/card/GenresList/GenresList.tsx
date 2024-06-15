import { useEffect, useState } from 'react';

import { Group, Text, useMantineTheme } from '@mantine/core';
import { useGetGenreListQuery } from '@redux/services/moviesService';
import { Genre } from '@redux/appTypes';

interface GenresListProps {
    genreIds: number[];
}

const GenresList = ({ genreIds }: GenresListProps) => {
    const theme = useMantineTheme();

    const { data: genresData } = useGetGenreListQuery();

    // const getGenresByIds = (genreIds: Array<number>, genres: Array<Genre>): Array<string> => {
    //     if (!genreIds) return [];

    //     return genreIds
    //         .map((id) => {
    //             const genre = genres.find(({ value }) => value === String(id));
    //             return genre?.label;
    //         })
    //         .filter((genre) => genre) as Array<string>;
    // };
    // const [genresString, setGenresString] = useState<string>('N/A');

    // useEffect(() => {
    //   const genresStr = getGenresByIds(genreIds, genresData?.genres || []).join(', ');

    //   if (genresStr.length > 0) {
    //     setGenresString(genresStr);
    //   } else {
    //     setGenresString('N/A');
    //   }
    // }, [genreIds, genresData]);
    const getGenreNameById = (id: number) => {
        const genre = genresData?.genres?.find((item) => item.value === String(id));
        return genre?.label;
    };

    return (
        // <Group gap="xxs" wrap="nowrap">
        //   <Text c={theme.colors.grey[6]} fz={{ base: 'xs', xs: 'sm' }} fw={400} lh="xs">
        //     Genres
        //   </Text>
        //   <Text fz={{ base: 'xs', xs: 'sm' }} fw={400} lh="xs">
        //     {truncateLength ? truncateString(genresString, truncateLength) : genresString}
        //   </Text>
        // </Group>
        <Group gap={'xs'}>
            <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[6]}>
                Genres
            </Text>

            {genreIds.map((id, index) => {
                return (
                    <Text
                        lh={'sm'}
                        display={'inline-block'}
                        key={id}
                        size='lg'
                        fw='400'
                        c={theme.colors.gray[9]}
                    >
                        {getGenreNameById(id)}
                        {index !== genreIds.length - 1 && `,`}
                        {<br />}
                    </Text>
                );
            })}
        </Group>
    );
};

export default GenresList;
