import { PolymorphicComponentProps, UnstyledButton, UnstyledButtonProps } from '@mantine/core';

import classes from './RatingControlButton.module.css';
import SmallChevronIcon from '@/components/icons/SmallChevronIcon';

const RatingControlButton = (props: PolymorphicComponentProps<'button', UnstyledButtonProps>) => (
    <UnstyledButton classNames={{ root: classes.button }} variant='transparent' {...props}>
        <SmallChevronIcon />
    </UnstyledButton>
);

export default RatingControlButton;
