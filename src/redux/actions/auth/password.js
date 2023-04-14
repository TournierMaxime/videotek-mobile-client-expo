import { ForgetPasswordMobile, CheckForgetPasswordCodeMobile, ResetPasswordMobile } from '../../../services/auth'

export const forgetPassword = (email) => async (dispatch) => {
  try {
    const response = await ForgetPasswordMobile(email)
    dispatch({type: 'FORGET_PASSWORD_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'FORGET_PASSWORD_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const checkForgetPasswordCode = (code) => async dispatch => {
  try {
    const response = await CheckForgetPasswordCodeMobile(code)
    dispatch({type: 'CHECK_FORGET_PASSWORD_CODE_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'CHECK_FORGET_PASSWORD_CODE_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};


export const resetPassword = (data) => async (dispatch) => {
  try {
    const response = await ResetPasswordMobile(data)
    dispatch({type: 'RESET_PASSWORD_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'RESET_PASSWORD_FAILURE', payload: error.message});
    throw error
  }
};
