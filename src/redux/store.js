import {configureStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { authCommonReducer, tmdbReducer, userReducer, favoriteReducer } from "./index"

const rootReducer = {
  ...authCommonReducer,
  ...tmdbReducer,
  ...userReducer,
  ...favoriteReducer
}

const createBaseStore = (reducers) => {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(thunkMiddleware),
  });

  return store;
};

const store = createBaseStore(rootReducer);

export default store
