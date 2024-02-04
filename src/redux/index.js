import { movieTmdbReducer, serieTmdbReducer, peopleTmdbReducer, searchTmdbReducer } from '@mod/mobile-tmdb/redux/index'
import { authCommonReducer, favoriteReducer } from '@mod/mobile-common/redux/index'
import {
  searchUsersReducer,
  oneUserReducer,
  updateUserReducer,
  deleteUserReducer
} from './reducers/users'

const userReducer = {
  searchUsers: searchUsersReducer,
  oneUser: oneUserReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer
}

export { authCommonReducer, favoriteReducer, movieTmdbReducer, serieTmdbReducer, peopleTmdbReducer, searchTmdbReducer, userReducer}