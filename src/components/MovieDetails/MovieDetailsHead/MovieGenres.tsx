import { Group, Text, useMantineTheme } from '@mantine/core';
import { MovieDescriptionLabel } from './MovieDescriptionLabel';
import { GenreType } from '@redux/appTypes';

type MovieGenresProps = {
    genres: GenreType[];
};

export const MovieGenres = ({ genres }: MovieGenresProps) => {
    const theme = useMantineTheme();

    return (
        <Group wrap='nowrap'>
            <MovieDescriptionLabel text='Genres' />

            <Group gap={'xs'}>
                {genres?.map((genre, index) => {
                    return (
                        <Text
                            lh={'sm'}
                            display={'inline-block'}
                            key={genre.id}
                            size='lg'
                            fw='400'
                            c={theme.colors.gray[9]}
                        >
                            {genre.name}
                            {index !== genres.length - 1 && `,`}
                            {<br />}
                        </Text>
                    );
                })}
            </Group>
        </Group>
    );
};
