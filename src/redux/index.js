import { movieTmdbReducer, serieTmdbReducer, peopleTmdbReducer, searchTmdbReducer } from '@mod/mobile-tmdb/redux/index'
import { authCommonReducer } from '@mod/mobile-common/redux/index'
import {
  searchUsersReducer,
  oneUserReducer,
  updateUserReducer,
  deleteUserReducer
} from './reducers/users'
import { favoritesReducer } from './reducers/favorites'

const userReducer = {
  searchUsers: searchUsersReducer,
  oneUser: oneUserReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer
}

const favoriteReducer = {
    favorites: favoritesReducer
}

export { authCommonReducer, movieTmdbReducer, serieTmdbReducer, peopleTmdbReducer, searchTmdbReducer, userReducer, favoriteReducer}