import {
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILURE,
    CHECK_FORGET_PASSWORD_CODE_SUCCESS,
    CHECK_FORGET_PASSWORD_CODE_FAILURE,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
  } from '../../actions/types/auth';
  
  const initialState = {
    forgetPasswordSuccess: false,
    forgetPasswordError: null,
    checkForgetPasswordCodeSuccess: false,
    checkForgetPasswordCodeError: null,
    resetPasswordSuccess: false,
    resetPasswordError: null,
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case FORGET_PASSWORD_SUCCESS:
        return {...state, forgetPasswordSuccess: true, forgetPasswordError: null};
      case FORGET_PASSWORD_FAILURE:
        return {
          ...state,
          forgetPasswordSuccess: false,
          forgetPasswordError: action.payload,
        };
      case CHECK_FORGET_PASSWORD_CODE_SUCCESS:
        return {
          ...state,
          checkForgetPasswordCodeSuccess: true,
          checkForgetPasswordCodeError: null,
        };
      case CHECK_FORGET_PASSWORD_CODE_FAILURE:
        return {
          ...state,
          checkForgetPasswordCodeSuccess: false,
          checkForgetPasswordCodeError: action.payload,
        };
      case RESET_PASSWORD_SUCCESS:
        return {...state, resetPasswordSuccess: true, resetPasswordError: null};
      case RESET_PASSWORD_FAILURE:
        return {
          ...state,
          resetPasswordSuccess: false,
          resetPasswordError: action.payload,
        };
      default:
        return state;
    }
  }
  