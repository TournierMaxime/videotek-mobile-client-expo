import http from '../../../services/axios';
import {CREATE_USER_FAILURE, CREATE_USER_SUCCESS} from '../types/auth';

export const createUser = (
  firstName,
  lastName,
  email,
  password,
  profilePicture,
) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await http.post(
        '/auth/register',
        firstName,
        lastName,
        email,
        password,
        profilePicture,
        config,
      );
      console.log(response);
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAILURE,
        payload: error.message,
      });
    }
  };
};
