import {
  movieTmdbReducer,
  serieTmdbReducer,
  peopleTmdbReducer,
  searchTmdbReducer,
  /*   feedsReducer, */
} from "@mod/mobile-tmdb/redux/index"
import { favoriteReducer, theme } from "@mod/mobile-common/redux/index"
import { authCommonReducer } from "@mod/mobile-auth/redux/index"
import {
  userReducers,
  recommendationReducers,
} from "@mod/mobile-user/redux/index"

export {
  authCommonReducer,
  favoriteReducer,
  movieTmdbReducer,
  serieTmdbReducer,
  peopleTmdbReducer,
  searchTmdbReducer,
  userReducers,
  recommendationReducers,
  theme,
  /*   feedsReducer, */
}
