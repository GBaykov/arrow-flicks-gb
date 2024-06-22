import { Group, Text, useMantineTheme } from '@mantine/core';
import { useGetGenreListQuery } from '@redux/services/moviesService';

type GenresListProps = {
    genreIds: number[];
};

const GenresList = ({ genreIds }: GenresListProps) => {
    const theme = useMantineTheme();

    const { data: genresData } = useGetGenreListQuery();

    const getGenreNameById = (id: number) => {
        const genre = genresData?.genres?.find((item) => item.value === String(id));
        return genre?.label;
    };

    return (
        <Group gap={'xs'}>
            <Text lh={'sm'} size='lg' fw='400' c={theme.colors.gray[6]}>
                Genres
            </Text>

            {genreIds?.map((id, index) => {
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
