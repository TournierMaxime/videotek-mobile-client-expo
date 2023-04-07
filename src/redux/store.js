import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import auth from './reducers/auth/auth';
import password from './reducers/auth/password';
import register from './reducers/auth/register';

const rootReducer = {
  auth: auth,
  register: register,
  password: password
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware)
});

export default store;
