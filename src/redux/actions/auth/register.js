import { Register } from '../../../services/auth';

export const createUser = (data) => async (dispatch) => {
  try {
    const response = await Register(data);
    dispatch({
      type: 'CREATE_USER_SUCCESS',
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: 'CREATE_USER_FAILURE',
      payload: error.message,
    });
    throw error;
  }
};
