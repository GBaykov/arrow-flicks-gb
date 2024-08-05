export const API_BASE_URL = "https://api.themoviedb.org";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const API_VERSION = "3";

export const API_LANGUAGE = "en";

const IMAGE_QUALITY = "w342";
const LOGO_QUALITY = "w185";

export const API_ENDPOINTS = {
  DISCOVER: `${API_BASE_URL}/${API_VERSION}/discover/movie`,
  GENRES: `${API_BASE_URL}/${API_VERSION}/genre/movie/list`,
  MOVIE: `${API_BASE_URL}/${API_VERSION}/movie`,
  IMAGES: `${IMAGE_BASE_URL}/${IMAGE_QUALITY}`,
  LOGOS: `${IMAGE_BASE_URL}/${LOGO_QUALITY}`,
} as const;
