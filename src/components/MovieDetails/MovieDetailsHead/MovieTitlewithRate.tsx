import { ActionIcon, Flex, Group, Text } from '@mantine/core';
import { FC, useEffect } from 'react';
import purpleStar from '../../../assets/icons/purpleStar.svg';
import star from '../../../assets/icons/star.svg';
import { MovieDetails, StoragedItem, StoragedMovie } from '@redux/appTypes';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appModal, setAppModal } from '@redux/reducers/appSlice';

type MovieTitleWithRateProps = {
    movie_details: MovieDetails;
};
export const MovieTitleWithRate: FC<MovieTitleWithRateProps> = ({ movie_details }) => {
    const dispatch = useAppDispatch();
    const storagedRated = localStorage.getItem('rated');

    const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];
    const ratedMovie = ratedMovies.find((item) => item?.movie_info?.id === movie_details?.id);

    const chosenMovie = useAppSelector(appModal);

    useEffect(() => {
        if (!chosenMovie) {
            localStorage.getItem('rated');
        }
    }, [chosenMovie]);

    const onStarClick = () => {
        if (movie_details) {
            const {
                id,
                original_title,
                poster_path,
                release_date,
                vote_average,
                vote_count,
                genres,
            } = movie_details;
            const genre_ids = genres.map((item) => item.id);
            const movie_info: StoragedMovie = {
                id,
                original_title,
                poster_path,
                release_date,
                vote_average,
                vote_count,
                genre_ids,
            };
            dispatch(
                setAppModal({
                    movie_info,
                    persnal_rate: ratedMovie?.persnal_rate || 0,
                }),
            );
        }
    };
    return (
        <Group justify='space-between' wrap='nowrap'>
            <Text
                p={0}
                variant='subtle'
                bg={'transparent'}
                style={{ wordWrap: 'break-word', display: 'inline-block' }}
                fw='600'
                size={'xl'}
                lh={'100%'}
            >
                {movie_details?.original_title}
            </Text>
            <Flex gap={'4px'} wrap={'nowrap'} align={'center'}>
                <ActionIcon variant='transparent' onClick={onStarClick}>
                    <img
                        style={{ border: 'none' }}
                        src={ratedMovie?.persnal_rate ? purpleStar : star}
                    />
                </ActionIcon>
                {ratedMovie?.persnal_rate && (
                    <Text fw={600} fz={'lg'} lh={'sm'}>
                        {ratedMovie?.persnal_rate}
                    </Text>
                )}
            </Flex>
        </Group>
    );
};
