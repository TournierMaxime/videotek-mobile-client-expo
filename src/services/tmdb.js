import { tmdbApi as http } from "./axios.js";
import { EXPO_TMDB_API_KEY } from '@env'

const NowPlaying = (page) => {
  return http.get("/movie/now_playing", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language: 'fr-FR',
      page,
    },
  });
};

const Upcoming = (page) => {
  return http.get("/movie/upcoming", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language: 'fr-FR',
      page
    },
  });
};

const OnTheAir = (page) => {
  return http.get("/tv/on_the_air", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language: 'fr-FR',
      page
    },
  });
};

const Popular = (page) => {
  return http.get("/tv/popular", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language: 'fr-FR',
      page
    },
  });
};

const People = (id) => {
  return http.get(`/person/${id}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language: 'fr-FR'
    },
  });
};

const Search = (page, query) => {
  return http.get("/search/multi", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language: 'fr-FR',
      page,
      include_adult: false,
      query
    },
  });
};

const MovieDetails = (id) => {
  return http.get(`/movie/${id}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language: 'fr-FR'
    },
  });
};

const SerieDetails = (id) => {
  return http.get(`/tv/${id}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language: 'fr-FR'
    },
  });
};

const PeopleDetails = (id) => {
  return http.get(`/person/${id}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language: 'fr-FR'
    },
  });
};

const MovieCrew = (id) => {
  return http.get(`/movie/${id}/credits`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language: 'fr-FR'
    },
  });
};


export { 
  NowPlaying,
  Upcoming,
  OnTheAir,
  Popular,
  People,
  Search,
  MovieDetails,
  SerieDetails,
  PeopleDetails,
  MovieCrew
};
