import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
//import logger from 'redux-logger';
import searchReducer from './reducers/tmdb/search'
import {
  oneUserReducer,
  updateUserReducer,
  deleteUserReducer,
} from './reducers/users'
import {
  searchCriticReducer,
  createCriticReducer,
  getOneCriticReducer,
  updateCriticReducer,
  deleteCriticReducer,
} from './reducers/critics'
import {
  searchFavoriteReducer,
  createFavoriteReducer,
  getOneFavoriteReducer,
  deleteFavoriteReducer,
} from './reducers/favorites'
import {
  authReducer,
  confirmEmailReducer,
  passwordReducer,
  registerUserReducer,
} from './reducers/auth'
import {
  nowPlayingReducer,
  movideDetailsReducer,
  upcomingReducer,
  movieCrewReducer,
  movieTrailerReducer,
  releaseDatesReducer,
  movieWatchProvidersReducer,
  trendingReducer,
} from './reducers/tmdb/movies'

import {
  detailsPeopleReducer,
  peopleCareerReducer,
  peopleExternalIdsReducer,
} from './reducers/tmdb/people'
import {
  onTheAirReducer,
  popularReducer,
  serieDetailsReducer,
  serieCrewReducer,
  serieTrailerReducer,
  seasonWatchProvidersReducer,
  trendingTVReducer,
  seasonDetailsReducer
} from './reducers/tmdb/series'

const rootReducer = {
  auth: authReducer,
  register: registerUserReducer,
  password: passwordReducer,
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
  oneUser: oneUserReducer,
  createCritic: createCriticReducer,
  searchCritic: searchCriticReducer,
  confirmEmail: confirmEmailReducer,
  deleteCritic: deleteCriticReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer,
  getOneCritic: getOneCriticReducer,
  updateCritic: updateCriticReducer,
  seasonDetails: seasonDetailsReducer,
  releaseDates: releaseDatesReducer,
  seasonWatchProviders: seasonWatchProvidersReducer,
  movieWatchProviders: movieWatchProvidersReducer,
  peopleExternalIds: peopleExternalIdsReducer,
  searchFavorite: searchFavoriteReducer,
  createFavorite: createFavoriteReducer,
  deleteFavorite: deleteFavoriteReducer,
  getOneFavorite: getOneFavoriteReducer,
  trendingTV: trendingTVReducer,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false }).concat(thunkMiddleware),
})
//immutableCheck: false désactiver pendant le dev
export default store
