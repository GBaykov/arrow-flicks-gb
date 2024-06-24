'use client';

import { Button, Divider, Group, Modal, Rating, Title, em, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { FC, useEffect, useState } from 'react';

import button_classes from '@/styles/Button.module.css';
import { appModal, setAppModal } from '@/redux/reducers/appSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { StoragedItem } from '@/redux/appTypes';

export const AppModal: FC = () => {
    const chosenMovie = useAppSelector((state) => state.app.movieForModal);
    const dispatch = useAppDispatch();

    const storagedRated = localStorage.getItem('rated');
    const ratedMovies: StoragedItem[] = storagedRated ? JSON.parse(storagedRated) : [];
    const ratedMovie = ratedMovies.find(
        (item) => item?.movie_info?.id === chosenMovie?.movie_info?.id,
    );

    const [value, setValue] = useState(0);

    useEffect(() => {
        if (chosenMovie?.persnal_rate) {
            setValue(chosenMovie?.persnal_rate);
        } else setValue(0);
    }, [chosenMovie]);

    const isMobile = useMediaQuery(`(max-width: ${em(800)})`);

    const onSaveRating = () => {
        if (chosenMovie) {
            const storagedMovie: StoragedItem = {
                movie_info: chosenMovie.movie_info,
                persnal_rate: value,
            };

            localStorage.removeItem('rated');
            if (!ratedMovie) {
                ratedMovies.push(storagedMovie);
                localStorage.setItem('rated', JSON.stringify(ratedMovies));
            } else {
                const newRatedArr: StoragedItem[] = ratedMovies.filter(
                    (item) => item.movie_info?.id !== chosenMovie?.movie_info?.id,
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
            (item) => item?.movie_info?.id !== chosenMovie?.movie_info?.id,
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
                        {chosenMovie?.movie_info?.original_title}
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
