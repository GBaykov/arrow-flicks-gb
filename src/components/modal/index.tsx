import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Button, Divider, Group, Modal, Rating, Title, em, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { StoragedItem } from '@redux/appTypes';
import { appModal, setAppModal } from '@redux/reducers/appSlice';

import { FC, useState } from 'react';

import button_classes from '../../modules.styles/Button.module.css';

export const AppModal: FC = () => {
    const chosenMovie = useAppSelector(appModal);
    const dispatch = useAppDispatch();

    const storagedRated = localStorage.getItem('rated');
    const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];
    const ratedMovie = ratedMovies.find((item) => item?.movie?.id === chosenMovie?.id);

    const [value, setValue] = useState(ratedMovie?.personalRate || 0);

    const isMobile = useMediaQuery(`(max-width: ${em(800)})`);
    console.log(isMobile);

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
            radius={'xs'}
            withinPortal={false}
            centered
            size='sm'
            opened={Boolean(chosenMovie)}
            onClose={() => dispatch(setAppModal(null))}
            p={0}
        >
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header p={'16px'}>
                    <Modal.Title fz={'h6'}>Your rating</Modal.Title>
                    <Modal.CloseButton c={theme.colors.gray[5]} size={'sm'} />
                </Modal.Header>
                <Divider m={0} style={{ margin: 0 }} />
                <Modal.Body p={'16px'}>
                    <Title order={5} mb={'16px'}>
                        {chosenMovie?.title}
                    </Title>
                    {isMobile && (
                        <Rating
                            count={10}
                            value={value}
                            onChange={setValue}
                            mb={'16px'}
                            size={'sm'}
                        />
                    )}
                    {!isMobile && (
                        <Rating
                            count={10}
                            value={value}
                            onChange={setValue}
                            mb={'16px'}
                            size='xl'
                        />
                    )}
                    <Group>
                        <Button
                            classNames={{
                                root: button_classes.filledRoot,
                                section: button_classes.filledSection,
                                inner: button_classes.filledInner,
                                label: button_classes.filledLabel,
                            }}
                            p={'10px 20px'}
                            c={theme.colors.gray[0]}
                            variant='filled'
                            onClick={onSaveRating}
                            fz={'14px'}
                            lh={'140%'}
                            fw={700}
                        >
                            Save
                        </Button>{' '}
                        <Button
                            classNames={{
                                root: button_classes.transparentRoot,
                            }}
                            p={0}
                            fz={'14px'}
                            fw={600}
                            lh={'140%'}
                            variant='transparent'
                            onClick={onRemoveRating}
                        >
                            Remove rating
                        </Button>
                    </Group>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};
