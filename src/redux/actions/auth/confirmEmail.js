import { ConfirmEmail } from '../../../services/auth';

export const confirmEmail = (userId, data) => async (dispatch) => {
  try {
    const response = await ConfirmEmail(userId, data);
    dispatch({
      type: 'CONFIRM_EMAIL_SUCCESS',
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: 'CONFIRM_EMAIL_FAILURE',
      payload: error.message,
    });
    throw error;
  }
};
