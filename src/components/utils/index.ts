import noIcon from '../../assets/icons/noCompanyIcon.svg';
import { FiltersState } from '@/redux/reducers/filtersSlice';
import { GenreType } from '@/redux/appTypes';

export const getMoviesYears = () => {
    const FirstFilmYear = 1895;
    const currentYear = new Date().getFullYear();
    const result: string[] = [];
    for (let year = currentYear; year >= FirstFilmYear; year--) {
        result.push(String(year));
    }
    return result;
};

export const paramsConstructor = ({
    selectedGenres,
    selectedYear,
    ratingFrom,
    ratingTo,
    sortBy,
    page = 1,
}: FiltersState) => {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('language', 'en-US');
    params.append('sort_by', sortBy);

    selectedGenres.forEach((genre) => params.append('with_genres', genre));
    selectedYear && params.append('primary_release_year', selectedYear);
    ratingFrom !== undefined && params.append('vote_average.gte', ratingFrom.toString());
    ratingTo !== undefined && params.append('vote_average.lte', ratingTo.toString());

    return params;
};

export const getGenreIdsByLabels = (allGenres: GenreType[], names: string[]) => {
    return allGenres.filter((genre) => names.includes(genre.name)).map((genre) => genre.id);
};

export const getGenreLabelsByIds = (allGenres: GenreType[], ids: number[]) => {
    return allGenres.filter((genre) => ids.includes(genre.id)).map((genre) => genre.name);
};

export const voteCountReduction = (v?: number) => {
    const num = v ? v : 0;
    if (num > 100000) {
        return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num > 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return String(num);
};

// export const getPoster = (path?: string, poster_width?: string, type?: 'Image' | 'Icon') => {
//     if (type === 'Icon') {
//         return path ? `${IMG_BASE_URL}${poster_width}${path}` : noIcon;
//     } else {
//         return path ? `${IMG_BASE_URL}${poster_width}${path}` : noPosterImg;
//     }
// };

export function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
        return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
}
