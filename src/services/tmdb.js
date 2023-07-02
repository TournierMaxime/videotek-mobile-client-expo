import { tmdbApi as http } from "./axios.js";
import { EXPO_TMDB_API_KEY } from '@env'

const NowPlaying = (page, language) => {
  return http.get("/movie/now_playing", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page,
    },
  });
};

const Upcoming = (page, language) => {
  return http.get("/movie/upcoming", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page
    },
  });
};

const OnTheAir = (page, language) => {
  return http.get("/tv/on_the_air", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page
    },
  });
};

const Popular = (page, language) => {
  return http.get("/tv/popular", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page
    },
  });
};

const Search = (page, query, language) => {
  return http.get("/search/multi", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page,
      include_adult: false,
      query
    },
  });
};

const MovieDetails = (id, language) => {
  return http.get(`/movie/${id}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const SerieDetails = (id, language) => {
  return http.get(`/tv/${id}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const SeasonDetails = (id, seasonNumber, language) => {
  return http.get(`/tv/${id}/season/${seasonNumber}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const SeasonWatchProviders = (id, seasonNumber, language) => {
  return http.get(`/tv/${id}/season/${seasonNumber}/watch/providers`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const PeopleDetails = (id, language) => {
  return http.get(`/person/${id}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const MovieCrew = (id, language) => {
  return http.get(`/movie/${id}/credits`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const MovieTrailer = (id, language) => {
  return http.get(`/movie/${id}/videos`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const SerieCrew = (id, language) => {
  return http.get(`/tv/${id}/credits`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const SerieTrailer = (id, language) => {
  return http.get(`/tv/${id}/videos`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const PeopleCareer = (id, language) => {
  return http.get(`/person/${id}/combined_credits`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const Trending = (page, language) => {
  return http.get(`/trending/all/day`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page
    },
  });
};


export { 
  NowPlaying,
  Upcoming,
  OnTheAir,
  Popular,
  Search,
  MovieDetails,
  SerieDetails,
  PeopleDetails,
  MovieCrew,
  MovieTrailer,
  SerieCrew,
  SerieTrailer,
  PeopleCareer,
  Trending,
  SeasonDetails,
  SeasonWatchProviders
};
