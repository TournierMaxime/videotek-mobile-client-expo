import createBaseStore from "@mod/mobile-common/redux/store"
import authCommonReducer from "@mod/mobile-common/redux/index"
import searchReducer from './reducers/tmdb/search'
import {
  oneUserReducer,
  updateUserReducer,
  deleteUserReducer
} from './reducers/users'
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

const videotekReducer = {
  searchCategory: searchCategoryReducer,
  searchGif: searchGifReducer,
  getOneGif: getOneGifReducer,
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

const rootReducer = {
  ...authCommonReducer,
  ...videotekReducer
}

const store = createBaseStore(rootReducer);

export default store
