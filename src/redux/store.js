import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import searchReducer from './reducers/tmdb/search'
import {
  oneUserReducer,
  updateUserReducer,
  deleteUserReducer
} from './reducers/users'
import {
  authReducer,
  confirmEmailReducer,
  passwordReducer,
  registerUserReducer
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
import {
  searchGifReducer,
  getOneGifReducer,
  searchCategoryReducer
} from './reducers/giphy'
import { favoritesReducer } from './reducers/tmdb/favorites'

const rootReducer = {
  searchCategory: searchCategoryReducer,
  searchGif: searchGifReducer,
  getOneGif: getOneGifReducer,
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
  confirmEmail: confirmEmailReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer,
  seasonDetails: seasonDetailsReducer,
  releaseDates: releaseDatesReducer,
  seasonWatchProviders: seasonWatchProvidersReducer,
  movieWatchProviders: movieWatchProvidersReducer,
  peopleExternalIds: peopleExternalIdsReducer,
  trendingTV: trendingTVReducer,
  favorites: favoritesReducer
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({immutableCheck: false, serializableCheck: false}).concat(thunkMiddleware)
});

export default store