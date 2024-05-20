import { SortTypes } from '@constants/enums';
import { AppFilters, GetMoviesArgs } from '@redux/appTypes';

export const getMoviesYears = () => {
    const FirstFilmYear = 1895;
    const currentYear = new Date().getFullYear();
    const result: string[] = [];
    for (let year = currentYear; year >= FirstFilmYear; year--) {
        result.push(String(year));
    }
    return result;
};

export const moviesArgsConstructor = (filters?: AppFilters, page?: number, sort_by?: SortTypes) => {
    let args: GetMoviesArgs = { language: 'en-US' };

    if (page) {
        args.page = page;
    }
    if (sort_by) {
        args.sort_by = sort_by;
    }

    if (filters?.primary_release_year) {
        args.primary_release_year = filters.primary_release_year;
    }

    if (filters?.with_genres.length) {
        args.with_genres = filters.with_genres;
    }
    if (filters?.['vote_average.lte']) {
        args['vote_average.lte'] = filters['vote_average.lte'];
    }

    if (filters?.['vote_average.gte']) {
        args['vote_average.gte'] = filters['vote_average.gte'];
    }

    console.log(args);
    return args;
};
