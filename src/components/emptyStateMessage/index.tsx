import { EmptyDataItem } from '@constants/empty';
import { PATHS } from '@constants/general';
import { Button, Flex, Stack, Title } from '@mantine/core';
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

    return (
        <Flex mt={'87px'} w={'100%'} bg='transparent' justify={'center'} align={'center'}>
            <Stack align='center'>
                <img width={'100%'} src={info.img} />

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
        </Flex>
    );
};
