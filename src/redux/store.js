import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import auth from './reducers/auth/auth';
import password from './reducers/auth/password';
import register from './reducers/auth/register';
import nowPlayingReducer from './reducers/tmdb/movies/nowPlaying'
import movideDetailsReducer from './reducers/tmdb/movies/detailsMovie'
import upcomingReducer from './reducers/tmdb/movies/upcoming'
import onTheAirReducer from './reducers/tmdb/series/onTheAir'
import popularReducer from './reducers/tmdb/series/popular'
import peopleReducer from './reducers/tmdb/people/people'
import searchReducer from './reducers/tmdb/search'

const rootReducer = {
  auth: auth,
  register: register,
  password: password,
  nowPlaying: nowPlayingReducer,
  upcoming: upcomingReducer,
  onTheAir: onTheAirReducer,
  popular: popularReducer,
  people: peopleReducer,
  search: searchReducer,
  movideDetails: movideDetailsReducer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware)
});

export default store;
