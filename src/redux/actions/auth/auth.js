import { Login, Logout } from '../../../services/auth'

export const loginUser = (data) => async (dispatch) => {
    try {
      const response = await Login(data)
      dispatch({
        type: 'LOGIN_USER_SUCCESS',
        payload: response.data,
      });
      return response.data
    } catch (error) {
      dispatch({
        type: 'LOGIN_USER_FAILURE',
        payload: error.message,
      });
      throw error
    }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const response = await Logout()
    dispatch({
      type: 'LOGOUT_USER_SUCCESS',
      payload: response.data,
    });
    return response.data
  } catch (error) {
    dispatch({
      type: 'LOGOUT_USER_FAILURE',
      payload: error.message,
    });
    throw error
  }
};
