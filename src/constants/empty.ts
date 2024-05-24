import pageNotFound from '../assets/images/pageNotFound.png';
import dataNotFound from '../assets/images/dataNotFound.png';
import empty from '../assets/images/empty.png';

export type EmptyDataItem = {
    img: string;
    discrition: string;
    btn_text?: string;
};

export type EmptyDataType = {
    page_not_found: EmptyDataItem;
    data_not_found: EmptyDataItem;
    emty: EmptyDataItem;
};

export const EmptyData: EmptyDataType = {
    page_not_found: {
        img: pageNotFound,
        discrition: `We can’t find the page you are looking for`,
        btn_text: 'Go Home',
    },

    data_not_found: {
        img: dataNotFound,
        discrition: `We don't have such movies, look for another one`,
    },

    emty: {
        img: empty,

        discrition: `You haven't rated any films yet`,
        btn_text: 'Find movies',
    },
};
