import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
//import logger from 'redux-logger';
import auth from './reducers/auth/auth';
import password from './reducers/auth/password';
import register from './reducers/auth/register';
import nowPlayingReducer from './reducers/tmdb/movies/nowPlaying'
import movieDetailsReducer from './reducers/tmdb/movies/detailsMovie'
import upcomingReducer from './reducers/tmdb/movies/upcoming'
import onTheAirReducer from './reducers/tmdb/series/onTheAir'
import popularReducer from './reducers/tmdb/series/popular'
import detailsPeopleReducer from './reducers/tmdb/people/detailsPeople'
import searchReducer from './reducers/tmdb/search'
import serieDetailsReducer from './reducers/tmdb/series/detailsSerie'
import movieCrewReducer from './reducers/tmdb/movies/movieCrew'
import movieTrailerReducer from './reducers/tmdb/movies/trailer'
import serieCrewReducer from './reducers/tmdb/series/serieCrew'
import serieTrailerReducer from './reducers/tmdb/series/trailer'
import peopleCareerReducer from './reducers/tmdb/people/careerPeople';

const rootReducer = {
  auth: auth,
  register: register,
  password: password,
  nowPlaying: nowPlayingReducer,
  upcoming: upcomingReducer,
  onTheAir: onTheAirReducer,
  popular: popularReducer,
  peopleDetails: detailsPeopleReducer,
  search: searchReducer,
  movieDetails: movieDetailsReducer,
  serieDetails: serieDetailsReducer,
  movieCrew: movieCrewReducer,
  movieTrailer: movieTrailerReducer,
  serieCrew: serieCrewReducer,
  serieTrailer: serieTrailerReducer,
  peopleCareer: peopleCareerReducer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({immutableCheck: false}).concat(thunkMiddleware)
});
//immutableCheck: false désactiver pendant le dev
export default store;
