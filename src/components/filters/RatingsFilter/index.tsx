import { Flex } from '@mantine/core';

import RatingInput from './RatingInput';
import {
    decrementRatingFrom,
    decrementRatingTo,
    filtersSelector,
    incrementRatingFrom,
    incrementRatingTo,
    setRatingFrom,
    setRatingTo,
} from '@/redux/reducers/filtersSlice';
import { useAppSelector } from '@/hooks';

const RatingsFilter = () => {
    const { ratingFrom, ratingTo } = useAppSelector(filtersSelector);

    return (
        <Flex
            gap={'xs'}
            align='flex-end'
            flex='1 1 100%'
            w='100%'
            maw={{ base: '218px', sm: '100%' }}
        >
            <RatingInput
                label='Ratings'
                placeHolder='From'
                controlledValue={ratingFrom}
                setValueAction={setRatingFrom}
                incrementAction={incrementRatingFrom}
                decrementAction={decrementRatingFrom}
            />
            <RatingInput
                placeHolder='To'
                controlledValue={ratingTo}
                setValueAction={setRatingTo}
                incrementAction={incrementRatingTo}
                decrementAction={decrementRatingTo}
            />
        </Flex>
    );
};

export default RatingsFilter;
