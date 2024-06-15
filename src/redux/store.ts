// src/redux/store.ts

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
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
  articlesReducer,
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
  ...articlesReducer,
}

const createBaseStore = (reducers: typeof rootReducer) => {
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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
