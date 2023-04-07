import http from '../../../services/axios';
import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from '../types/auth';

export const loginUser = (email, password) => {
  return async dispatch => {
    try {
      const response = await http.post('auth/login', {
        email,
        password,
      });
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    try {
      // Appeler l'API pour supprimer le token d'authentification côté serveur
      await http.post('/auth/logout');

      // Supprimer le token d'authentification côté client
      dispatch({
        type: LOGOUT_USER,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
