import { configureStore } from "@reduxjs/toolkit"
import thunkMiddleware from "redux-thunk"
import {
  authCommonReducer,
  userReducers,
  favoriteReducer,
  movieTmdbReducer,
  serieTmdbReducer,
  peopleTmdbReducer,
  searchTmdbReducer,
  recommendationReducers,
  theme,
  /*   feedsReducer, */
} from "./index"

const rootReducer = {
  ...authCommonReducer,
  ...userReducers,
  ...movieTmdbReducer,
  ...serieTmdbReducer,
  ...peopleTmdbReducer,
  ...searchTmdbReducer,
  ...favoriteReducer,
  ...recommendationReducers,
  ...theme,
  /*   ...feedsReducer, */
}

const createBaseStore = (reducers) => {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(thunkMiddleware),
  })

  return store
}

const store = createBaseStore(rootReducer)

export default store
