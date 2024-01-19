import createBaseStore from "@mod/mobile-common/redux/store"
import authCommonReducer from "@mod/mobile-common/redux/index"
import tmdbReducer from "@mod/mobile-tmdb/redux/index"
import {
  oneUserReducer,
  updateUserReducer,
  deleteUserReducer
} from './reducers/users'
import { favoritesReducer } from './reducers/favorites'

const videotekReducer = {
  oneUser: oneUserReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer,
  favorites: favoritesReducer
}

const rootReducer = {
  ...authCommonReducer,
  ...videotekReducer,
  ...tmdbReducer
}

const store = createBaseStore(rootReducer);

export default store
