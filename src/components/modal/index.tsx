import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Button, Flex, Group, Modal, Rating, Text, Title, useMantineTheme } from '@mantine/core';
import { MovieItem, StoragedItem } from '@redux/appTypes';
import { appModal, setAppModal } from '@redux/reducers/appSlice';

import { FC, useState } from 'react';

export const AppModal: FC = () => {
    const chosenMovie = useAppSelector(appModal);
    const dispatch = useAppDispatch();

    const storagedRated = localStorage.getItem('rated');
    const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];
    const ratedMovie = ratedMovies.find((item) => item?.movie?.id === chosenMovie?.id);

    // const [isOpen, setIsOpen] = useState(isModalOpen);
    const [value, setValue] = useState(ratedMovie?.personalRate || 0);
    // const isModalOpen = useAppSelector(appModal);

    const onSaveRating = () => {
        if (chosenMovie) {
            const storagedMovie: StoragedItem = { movie: chosenMovie, personalRate: value };

            localStorage.removeItem('rated');
            if (!ratedMovie) {
                ratedMovies.push(storagedMovie);
                localStorage.setItem('rated', JSON.stringify(ratedMovies));
            } else {
                const newRatedArr: StoragedItem[] = ratedMovies.filter(
                    (item) => item.movie?.id !== chosenMovie?.id,
                );
                newRatedArr.push(storagedMovie);

                localStorage.removeItem('rated');
                localStorage.setItem('rated', JSON.stringify(newRatedArr));
            }
        }
        dispatch(setAppModal(null));
    };

    const onRemoveRating = () => {
        const newRatedArr: StoragedItem[] = ratedMovies.filter(
            (item) => item?.movie?.id !== chosenMovie?.id,
        );
        localStorage.removeItem('rated');
        localStorage.setItem('rated', JSON.stringify(newRatedArr));
        dispatch(setAppModal(null));
    };
    const theme = useMantineTheme();

    return (
        <Modal.Root
            withinPortal={false}
            centered
            size='sm'
            opened={Boolean(chosenMovie)}
            onClose={() => dispatch(setAppModal(null))}
        >
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>Your rating</Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <Text size={'md'}>{chosenMovie?.title}</Text>
                    <Rating count={10} value={value} onChange={setValue} />
                    <Group>
                        <Button c={theme.colors.gray[0]} variant='filled' onClick={onSaveRating}>
                            Save
                        </Button>{' '}
                        <Button variant='transparent' onClick={onRemoveRating}>
                            Remove rating
                        </Button>
                    </Group>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};
