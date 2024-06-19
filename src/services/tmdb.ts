import { tmdbApi as http } from "./axios"
import { EXPO_TMDB_API_KEY } from "@env"

const ReleaseDates = (id: number) => {
  return http.get(`/movie/${id}/release_dates`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
    },
  })
}

const NowPlaying = (page: number, language: string) => {
  return http.get("/movie/now_playing", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page,
    },
  })
}

const TopRated = (page: number, language: string) => {
  return http.get("/movie/top_rated", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page,
    },
  })
}

const Upcoming = (page: number, language: string) => {
  return http.get("/movie/upcoming", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page,
    },
  })
}

const OnTheAir = (page: number, language: string) => {
  return http.get("/tv/on_the_air", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page,
    },
  })
}

const Popular = (page: number, language: string) => {
  return http.get("/tv/popular", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page,
    },
  })
}

const Search = (page: number, query: string, language: string) => {
  return http.get("/search/multi", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page,
      include_adult: false,
      query,
    },
  })
}

const MovieDetails = (id: number, language: string) => {
  return http.get(`/movie/${id}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
    },
  })
}

const MovieWatchProviders = (id: number) => {
  return http.get(`/movie/${id}/watch/providers`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
    },
  })
}

const SerieDetails = (id: number, language: string) => {
  return http.get(`/tv/${id}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
    },
  })
}

const SeasonDetails = (id: number, seasonNumber: number, language: string) => {
  return http.get(`/tv/${id}/season/${seasonNumber}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
    },
  })
}

const SeasonWatchProviders = (id: number, seasonNumber: number) => {
  return http.get(`/tv/${id}/season/${seasonNumber}/watch/providers`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
    },
  })
}

const PeopleDetails = (id: number, language: string) => {
  return http.get(`/person/${id}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
    },
  })
}

const MovieCrew = (id: number, language: string) => {
  return http.get(`/movie/${id}/credits`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
    },
  })
}

const MovieTrailer = (id: number, language: string) => {
  return http.get(`/movie/${id}/videos`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
    },
  })
}

const SerieCrew = (id: number, language: string) => {
  return http.get(`/tv/${id}/credits`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
    },
  })
}

const SerieTrailer = (id: number, language: string) => {
  return http.get(`/tv/${id}/videos`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
    },
  })
}

const PeopleCareer = (id: number, language: string) => {
  return http.get(`/person/${id}/combined_credits`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
    },
  })
}

const Trending = (page: number, language: string) => {
  return http.get(`/trending/all/day`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page,
    },
  })
}

const TrendingTV = (page: number, language: string) => {
  return http.get(`/trending/tv/week`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page,
    },
  })
}

const PeopleExternalIds = (id: number) => {
  return http.get(`/person/${id}/external_ids`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
    },
  })
}

const RecommendationMovie = (id: number) => {
  return http.get(`/movie/${id}/recommendations`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
    },
  })
}

const RecommendationSerie = (id: number) => {
  return http.get(`/tv/${id}/recommendations`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
    },
  })
}

export {
  ReleaseDates,
  NowPlaying,
  TopRated,
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
  TrendingTV,
  SeasonDetails,
  SeasonWatchProviders,
  MovieWatchProviders,
  PeopleExternalIds,
  RecommendationMovie,
  RecommendationSerie,
}
