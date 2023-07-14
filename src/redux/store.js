import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
//import logger from 'redux-logger';
import auth from './reducers/auth/auth';
import password from './reducers/auth/password';
import register from './reducers/auth/register';
import nowPlayingReducer from './reducers/tmdb/movies/nowPlaying'
import movieDetailsReducer from './reducers/tmdb/movies/detailsMovie'
import upcomingReducer from './reducers/tmdb/movies/upcoming'
import onTheAirReducer from './reducers/tmdb/series/onTheAir'
import popularReducer from './reducers/tmdb/series/popular'
import detailsPeopleReducer from './reducers/tmdb/people/detailsPeople'
import searchReducer from './reducers/tmdb/search'
import serieDetailsReducer from './reducers/tmdb/series/detailsSerie'
import movieCrewReducer from './reducers/tmdb/movies/movieCrew'
import movieTrailerReducer from './reducers/tmdb/movies/trailer'
import serieCrewReducer from './reducers/tmdb/series/serieCrew'
import serieTrailerReducer from './reducers/tmdb/series/trailer'
import peopleCareerReducer from './reducers/tmdb/people/careerPeople'
import trendingReducer from './reducers/tmdb/movies/trending'
import oneUserReducer from './reducers/users/oneUser'
import createCriticReducer from './reducers/critics/createCritic'
import searchCriticReducer from './reducers/critics/searchCritic'
import confirmEmailReducer from './reducers/auth/confirmEmail'
import deleteCriticReducer from './reducers/critics/deleteCritic'
import updateUserReducer from './reducers/users/updateUser'
import deleteUserReducer from './reducers/users/deleteUser'
import getOneCriticReducer from './reducers/critics/getOneCritic'
import updateCriticReducer from './reducers/critics/updateCritic'
import detailsSeasonReducer from './reducers/tmdb/series/detailsSeason'
import releaseDatesReducer from './reducers/tmdb/movies/releaseDates'
import seasonWatchProvidersReducer from './reducers/tmdb/series/seasonWatchProviders'
import movieWatchProvidersReducer from './reducers/tmdb/movies/movieWatchProviders'
import peopleExternalIdsReducer from './reducers/tmdb/people/externalIds'
import searchFavoriteReducer from './reducers/favorites/searchFavorite'
import createFavoriteReducer from './reducers/favorites/createFavorite'
import deleteFavoriteReducer from './reducers/favorites/deleteFavorite'
import getOneFavoriteReducer from './reducers/favorites/getOneFavorite'

const rootReducer = {
  auth: auth,
  register: register,
  password: password,
  nowPlaying: nowPlayingReducer,
  upcoming: upcomingReducer,
  onTheAir: onTheAirReducer,
  popular: popularReducer,
  peopleDetails: detailsPeopleReducer,
  search: searchReducer,
  movieDetails: movieDetailsReducer,
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
  seasonDetails: detailsSeasonReducer,
  releaseDates: releaseDatesReducer,
  seasonWatchProviders: seasonWatchProvidersReducer,
  movieWatchProviders: movieWatchProvidersReducer,
  peopleExternalIds: peopleExternalIdsReducer,
  searchFavorite: searchFavoriteReducer,
  createFavorite: createFavoriteReducer,
  deleteFavorite: deleteFavoriteReducer,
  getOneFavorite: getOneFavoriteReducer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({immutableCheck: false}).concat(thunkMiddleware)
});
//immutableCheck: false désactiver pendant le dev
export default store;
