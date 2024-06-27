import { Image } from '@mantine/core';

import noPosterImg from '@/assets/images/noPoster.png';
import { API_BASE_URL, API_ROUTES } from '@/constants/app';

interface MoviePosterProps {
    poster_path: string;
    title: string;
    size?: 'sm' | 'lg';
}

 const MoviePoster = ({ poster_path, title, size = 'sm' }: MoviePosterProps) => (
    <Image
        display={{ base: 'none', xs: 'block' }}
        w={size === 'sm' ? 119 : { base: 200, xs: 250 }}
        alt={title}
        fallbackSrc={noPosterImg.src}
        src={poster_path ? `${API_BASE_URL}${API_ROUTES.IMAGES}${poster_path}` : noPosterImg.src}
    />
);
export default MoviePoster