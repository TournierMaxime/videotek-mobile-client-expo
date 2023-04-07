import axios from 'axios';
import {
  CHECK_FORGET_PASSWORD_CODE_FAILURE,
  CHECK_FORGET_PASSWORD_CODE_SUCCESS,
  FORGET_PASSWORD_FAILURE,
  FORGET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
} from '../types/auth';

export const forgetPassword = email => async dispatch => {
  try {
    const response = await axios.post('/forgetPasswordMobile', {email});
    dispatch({type: FORGET_PASSWORD_SUCCESS});
  } catch (error) {
    dispatch({type: FORGET_PASSWORD_FAILURE, payload: error});
  }
};

export const checkForgetPasswordCode = (email, code) => async dispatch => {
  try {
    const response = await axios.post('/checkForgetPasswordCode', {
      email,
      code,
    });
    dispatch({type: CHECK_FORGET_PASSWORD_CODE_SUCCESS});
  } catch (error) {
    dispatch({type: CHECK_FORGET_PASSWORD_CODE_FAILURE, payload: error});
  }
};

export const resetPassword = (email, code, passwordHash) => async dispatch => {
  try {
    const response = await axios.post('/resetPasswordMobile', {
      email,
      forgetPassword: code,
      passwordHash,
    });
    dispatch({type: RESET_PASSWORD_SUCCESS});
  } catch (error) {
    dispatch({type: RESET_PASSWORD_FAILURE, payload: error});
  }
};
