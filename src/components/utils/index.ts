import { SortTypes } from '@constants/enums';
import { AppFilters, GenreType, GetMoviesArgs } from '@redux/appTypes';

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

    return args;
};

export const getGenreIdsByLabels = (allGenres: GenreType[], names: string[]) => {
    return allGenres.filter((genre) => names.includes(genre.name)).map((genre) => genre.id);
};

export const getGenreLabelsByIds = (allGenres: GenreType[], ids: number[]) => {
    return allGenres.filter((genre) => ids.includes(genre.id)).map((genre) => genre.name);
};

export const voteCountReduction = (vote: number) => {
    '2 799 9 = 2,7M';
    '799 9 = 799K';
    '99 9 = 99K';
    '9 9 = 9K';
    '9  = 0,9K';
    if (String(vote).length === 5) {
        return `${(vote / 10000).toFixed(1)}M`;
    } else if (String(vote).length >= 2 && String(vote).length <= 4) {
        return `${Math.round(vote / 10)}K`;
    } else {
        return '';
    }
};
