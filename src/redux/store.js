import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import auth from './reducers/auth/auth';
import password from './reducers/auth/password';
import register from './reducers/auth/register';
import nowPlayingReducer from './reducers/tmdb/nowPlaying'
import upcomingReducer from './reducers/tmdb/upcoming'
import onTheAirReducer from './reducers/tmdb/onTheAir'
import popularReducer from './reducers/tmdb/popular'

const rootReducer = {
  auth: auth,
  register: register,
  password: password,
  nowPlaying: nowPlayingReducer,
  upcoming: upcomingReducer,
  onTheAir: onTheAirReducer,
  popular: popularReducer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware)
});

export default store;
