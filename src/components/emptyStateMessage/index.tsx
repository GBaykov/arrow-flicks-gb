import { EmptyDataItem } from '@constants/empty';
import { PATHS } from '@constants/general';
import { Box, Button, Center, Image, Stack, Title } from '@mantine/core';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type EmptyStateMessageProps = {
    info: EmptyDataItem;
};

export const EmptyStateMessage: FC<EmptyStateMessageProps> = ({ info }) => {
    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate(PATHS.MAIN);
    };
    console.log(info);
    return (
        <Center w={'100%'} h={'100vh'} bg='transparent'>
            <Stack align='center'>
                <img width={'100%'} src={info.img} />
                {/* <Image w={'100%'} maw='653px' src={info.img} /> */}
                <Title order={3}>{info.discrition}</Title>
                {info.btn_text && (
                    <Button
                        radius={'sm'}
                        p={'10px 20px'}
                        onClick={onButtonClick}
                        variant='filled'
                        size='md'
                    >
                        {info.btn_text}
                    </Button>
                )}
            </Stack>
        </Center>
    );
};
