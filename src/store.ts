import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit"
import thunkMiddleware from "redux-thunk"
import {
  authReducer,
  confirmEmailReducer,
  passwordReducer,
  registerUserReducer,
  verifyAppleTokenReducer,
} from "@mod/mobile-auth/redux/reducers/auth"
import { favoritesReducer } from "@mod/mobile-common/redux/reducers/favorites"
import { themeReducer } from "@mod/mobile-common/redux/reducers/theme"
import {
  nowPlayingReducer,
  movideDetailsReducer,
  upcomingReducer,
  movieCrewReducer,
  movieTrailerReducer,
  releaseDatesReducer,
  movieWatchProvidersReducer,
  trendingReducer,
  movieRecommendationReducer,
  topRatedReducer,
} from "@mod/mobile-tmdb/redux/reducers/movies"
import {
  detailsPeopleReducer,
  peopleCareerReducer,
  peopleExternalIdsReducer,
} from "@mod/mobile-tmdb/redux/reducers/people"
import {
  onTheAirReducer,
  popularReducer,
  serieDetailsReducer,
  serieCrewReducer,
  serieTrailerReducer,
  seasonWatchProvidersReducer,
  trendingTVReducer,
  seasonDetailsReducer,
  serieRecommendationReducer,
} from "@mod/mobile-tmdb/redux/reducers/series"
import searchReducer from "@mod/mobile-tmdb/redux/reducers/search"
import {
  searchArticlesReducer,
  oneArticleReducer,
} from "@mod/mobile-tmdb/redux/reducers/articles"
import {
  searchUsersReducer,
  oneUserReducer,
  updateUserReducer,
  deleteUserReducer,
} from "@mod/mobile-user/redux/reducers/users"
import {
  createRecommendationReducer,
  oneRecommendationReducer,
  deleteRecommendationReducer,
} from "@mod/mobile-user/redux/reducers/recommendations"

const authReducers = {
  auth: authReducer,
  register: registerUserReducer,
  password: passwordReducer,
  confirmEmail: confirmEmailReducer,
  verifyAppleToken: verifyAppleTokenReducer,
}

const commonReducers = {
  favorites: favoritesReducer,
  theme: themeReducer,
}

const tmdbReducers = {
  nowPlaying: nowPlayingReducer,
  upcoming: upcomingReducer,
  movieDetails: movideDetailsReducer,
  movieCrew: movieCrewReducer,
  movieTrailer: movieTrailerReducer,
  trending: trendingReducer,
  releaseDates: releaseDatesReducer,
  movieWatchProviders: movieWatchProvidersReducer,
  movieRecommendation: movieRecommendationReducer,
  topRated: topRatedReducer,
  onTheAir: onTheAirReducer,
  popular: popularReducer,
  serieDetails: serieDetailsReducer,
  serieCrew: serieCrewReducer,
  serieTrailer: serieTrailerReducer,
  seasonDetails: seasonDetailsReducer,
  seasonWatchProviders: seasonWatchProvidersReducer,
  trendingTV: trendingTVReducer,
  serieRecommendation: serieRecommendationReducer,
  peopleExternalIds: peopleExternalIdsReducer,
  peopleDetails: detailsPeopleReducer,
  peopleCareer: peopleCareerReducer,
  search: searchReducer,
  searchArticles: searchArticlesReducer,
  oneArticle: oneArticleReducer,
}

const userReducers = {
  searchUsers: searchUsersReducer,
  oneUser: oneUserReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer,
  createRecommendation: createRecommendationReducer,
  oneRecommendation: oneRecommendationReducer,
  deleteRecommendation: deleteRecommendationReducer,
}

const rootReducer = combineReducers({
  ...authReducers,
  ...commonReducers,
  ...tmdbReducers,
  ...userReducers,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(thunkMiddleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
