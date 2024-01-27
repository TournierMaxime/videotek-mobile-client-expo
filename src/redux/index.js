import {
  authReducer,
  confirmEmailReducer,
  passwordReducer,
  registerUserReducer
} from './reducers/auth'
import searchReducer from './reducers/search'
import {
  nowPlayingReducer,
  movideDetailsReducer,
  upcomingReducer,
  movieCrewReducer,
  movieTrailerReducer,
  releaseDatesReducer,
  movieWatchProvidersReducer,
  trendingReducer,
} from './reducers/movies'

import {
  detailsPeopleReducer,
  peopleCareerReducer,
  peopleExternalIdsReducer,
} from './reducers/people'
import {
  onTheAirReducer,
  popularReducer,
  serieDetailsReducer,
  serieCrewReducer,
  serieTrailerReducer,
  seasonWatchProvidersReducer,
  trendingTVReducer,
  seasonDetailsReducer,
} from './reducers/series'
import {
  oneUserReducer,
  updateUserReducer,
  deleteUserReducer
} from './reducers/users'
import { favoritesReducer } from './reducers/favorites'

const tmdbReducer = {
  nowPlaying: nowPlayingReducer,
  upcoming: upcomingReducer,
  onTheAir: onTheAirReducer,
  popular: popularReducer,
  peopleDetails: detailsPeopleReducer,
  search: searchReducer,
  movieDetails: movideDetailsReducer,
  serieDetails: serieDetailsReducer,
  movieCrew: movieCrewReducer,
  movieTrailer: movieTrailerReducer,
  serieCrew: serieCrewReducer,
  serieTrailer: serieTrailerReducer,
  peopleCareer: peopleCareerReducer,
  trending: trendingReducer,
  seasonDetails: seasonDetailsReducer,
  releaseDates: releaseDatesReducer,
  seasonWatchProviders: seasonWatchProvidersReducer,
  movieWatchProviders: movieWatchProvidersReducer,
  peopleExternalIds: peopleExternalIdsReducer,
  trendingTV: trendingTVReducer
}


const authCommonReducer = {
  auth: authReducer,
  register: registerUserReducer,
  password: passwordReducer,
  confirmEmail: confirmEmailReducer
}

const userReducer = {
  oneUser: oneUserReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer
}

const favoriteReducer = {
    favorites: favoritesReducer
}

export { authCommonReducer, tmdbReducer, userReducer, favoriteReducer}