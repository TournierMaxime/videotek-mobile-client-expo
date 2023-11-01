import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
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
import {
  searchPostReducer,
  createPostReducer,
  getOnePostReducer,
  updatePostReducer,
  deletePostReducer,
} from './reducers/posts'
import {
  searchGifReducer,
  getOneGifReducer,
  searchCategoryReducer
} from './reducers/giphy'
import {
  searchLikeReducer,
  createLikeReducer,
  getOneLikePostReducer,
  getOneLikeCommentReducer,
  getOneLikeCriticReducer,
  deleteLikeReducer
} from './reducers/likes'
import {
  searchWatchListReducer,
  createWatchListReducer,
  getOneWatchListReducer,
  deleteWatchListReducer,
} from './reducers/watchlists'
import {
  createSeasonReducer,
  getOneSeasonReducer,
  deleteSeasonReducer,
} from './reducers/seasons'
import {
  createEpisodeReducer,
  deleteEpisodeReducer,
} from './reducers/episodes'
import {
  watchedReducer
} from './reducers/watched'

const rootReducer = {
  watched: watchedReducer,
  createSeason: createSeasonReducer,
  getOneSeason: getOneSeasonReducer,
  deleteSeason: deleteSeasonReducer,
  createEpisode: createEpisodeReducer,
  deleteEpisode: deleteEpisodeReducer,
  searchWatchList: searchWatchListReducer,
  createWatchList: createWatchListReducer,
  getOneWatchList: getOneWatchListReducer,
  deleteWatchList: deleteWatchListReducer,
  searchLike: searchLikeReducer,
  createLike: createLikeReducer,
  getOneLikePost: getOneLikePostReducer,
  getOneLikeComment: getOneLikeCommentReducer,
  getOneLikeCritic: getOneLikeCriticReducer,
  deleteLike: deleteLikeReducer,
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
  searchPost: searchPostReducer,
  createPost: createPostReducer,
  getOnePost: getOnePostReducer,
  updatePost: updatePostReducer,
  deletePost: deletePostReducer
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({immutableCheck: false, serializableCheck: false}).concat(thunkMiddleware)
});

export default store