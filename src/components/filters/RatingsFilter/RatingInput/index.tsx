import { useEffect, useState } from 'react';

import { NumberInput, Stack, Title } from '@mantine/core';

import { UnknownAction } from '@reduxjs/toolkit';

import commonClasses from '../../MoviesFilters.module.css';
import RatingControlButton from '../RatingControlButton';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { MAX_RATING, MIN_RATING } from '@constants/general';

interface RatingInputProps {
    label?: string;
    placeHolder: string;
    controlledValue: number | undefined;
    setValueAction: (value: number | undefined) => UnknownAction;
    incrementAction: () => UnknownAction;
    decrementAction: () => UnknownAction;
}

const RatingInput = ({
    label,
    placeHolder,
    controlledValue,
    setValueAction,
    incrementAction,
    decrementAction,
}: RatingInputProps) => {
    const [inputKey, setInputKey] = useState(Date.now());
    const dispatch = useAppDispatch();

    useEffect(() => {
        setInputKey(Date.now());
    }, [controlledValue]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === '' && controlledValue !== undefined) {
            dispatch(setValueAction(undefined));
            return;
        }

        const numberValue = Number(e.currentTarget.value);

        if (numberValue < MIN_RATING) {
            dispatch(setValueAction(MIN_RATING));
            setInputKey(Date.now());
            return;
        }

        if (numberValue > MAX_RATING) {
            dispatch(setValueAction(MAX_RATING));
            setInputKey(Date.now());
            return;
        }

        dispatch(setValueAction(numberValue));
    };

    return (
        <NumberInput
            key={inputKey}
            label={<Title order={5}>{label}</Title> || null}
            placeholder={placeHolder}
            value={controlledValue}
            onBlur={(e) => handleBlur(e)}
            rightSection={
                <Stack justify='center' align='center' gap={0}>
                    <RatingControlButton
                        disabled={controlledValue === MAX_RATING}
                        onClick={() => dispatch(incrementAction())}
                    />
                    <RatingControlButton
                        disabled={controlledValue === undefined}
                        onClick={() => dispatch(decrementAction())}
                    />
                </Stack>
            }
            classNames={{
                root: commonClasses.filterRoot,
                label: commonClasses.filterLabel,
                input: commonClasses.inputRoot,
            }}
            allowDecimal={false}
            allowNegative={false}
            clampBehavior='blur'
            min={0}
            max={10}
        />
    );
};

export default RatingInput;
