import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import auth from './reducers/auth/auth';
import password from './reducers/auth/password';
import register from './reducers/auth/register';
import nowPlayingReducer from './reducers/tmdb/movies/nowPlaying'
import movieDetailsReducer from './reducers/tmdb/movies/detailsMovie'
import upcomingReducer from './reducers/tmdb/movies/upcoming'
import onTheAirReducer from './reducers/tmdb/series/onTheAir'
import popularReducer from './reducers/tmdb/series/popular'
import peopleReducer from './reducers/tmdb/people/people'
import searchReducer from './reducers/tmdb/search'
import serieDetailsReducer from './reducers/tmdb/series/detailsSerie'
import movieCrewReducer from './reducers/tmdb/movies/movieCrew'
import movieTrailerReducer from './reducers/tmdb/movies/trailer'
import serieCrewReducer from './reducers/tmdb/series/serieCrew'
import serieTrailerReducer from './reducers/tmdb/series/trailer'
import peopleCastReducer from './reducers/tmdb/people/detailsPeople';

const rootReducer = {
  auth: auth,
  register: register,
  password: password,
  nowPlaying: nowPlayingReducer,
  upcoming: upcomingReducer,
  onTheAir: onTheAirReducer,
  popular: popularReducer,
  peopleDetails: peopleReducer,
  search: searchReducer,
  movieDetails: movieDetailsReducer,
  serieDetails: serieDetailsReducer,
  movieCrew: movieCrewReducer,
  movieTrailer: movieTrailerReducer,
  serieCrew: serieCrewReducer,
  serieTrailer: serieTrailerReducer,
  peopleCast: peopleCastReducer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware)
});
//immutableCheck: false désactiver pendant le dev
export default store;
