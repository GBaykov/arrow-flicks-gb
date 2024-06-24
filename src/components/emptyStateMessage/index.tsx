import { APP_ROUTES } from '@/constants/app';
import { EmptyDataItem } from '@/constants/empty';

import { Button, Flex, Stack, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

type EmptyStateMessageProps = {
    info: EmptyDataItem;
};

export const EmptyStateMessage: FC<EmptyStateMessageProps> = ({ info }) => {
    const router = useRouter();

    return (
        <Flex mt={'87px'} w={'100%'} bg='transparent' justify={'center'} align={'center'}>
            <Stack align='center'>
                <img width={'100%'} src={info.img} />

                <Title order={3}>{info.discrition}</Title>
                {info.btn_text && (
                    <Button
                        radius={'sm'}
                        p={'10px 20px'}
                        onClick={() => router.push(APP_ROUTES.HOME)}
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
