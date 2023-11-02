import {
  Login,
  Logout,
  LoginWithUserId,
  ConfirmEmail,
  ForgetPasswordMobile,
  CheckForgetPasswordCodeMobile,
  ResetPasswordMobile,
  Register,
} from '../../services/auth'

const loginUser = (data) => async (dispatch) => {
  try {
    const response = await Login(data)
    dispatch({
      type: 'LOGIN_USER_SUCCESS',
      payload: response.data,
    })
    return response.data
  } catch (error) {
    dispatch({
      type: 'LOGIN_USER_FAILURE',
      payload: error.message,
    })
    throw error
  }
}

const loginWithUserId = (data) => async (dispatch) => {
  try {
    const response = await LoginWithUserId(data)
    dispatch({
      type: 'LOGIN_WITH_USERID_SUCCESS',
      payload: response.data,
    })
    return response.data
  } catch (error) {
    dispatch({
      type: 'LOGIN_WITH_USERID_FAILURE',
      payload: error.message,
    })
    throw error
  }
}

const logoutUser = () => async (dispatch) => {
  try {
    const response = Logout()
    dispatch({
      type: 'LOGOUT_USER_SUCCESS',
      payload: response.data,
    })
    return response.data
  } catch (error) {
    dispatch({
      type: 'LOGOUT_USER_FAILURE',
      payload: error.message,
    })
    throw error
  }
}

const confirmEmail = (userId, data) => async (dispatch) => {
  try {
    const response = await ConfirmEmail(userId, data)
    dispatch({
      type: 'CONFIRM_EMAIL_SUCCESS',
      payload: response.data,
    })
    return response.data
  } catch (error) {
    dispatch({
      type: 'CONFIRM_EMAIL_FAILURE',
      payload: error.message,
    })
    throw error
  }
}

const forgetPassword = (email) => async (dispatch) => {
  try {
    const response = await ForgetPasswordMobile(email)
    dispatch({ type: 'FORGET_PASSWORD_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'FORGET_PASSWORD_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const checkForgetPasswordCode = (data) => async (dispatch) => {
  try {
    const response = await CheckForgetPasswordCodeMobile(data)
    dispatch({
      type: 'CHECK_FORGET_PASSWORD_CODE_SUCCESS',
      payload: response.data,
    })
    return response.data
  } catch (error) {
    dispatch({
      type: 'CHECK_FORGET_PASSWORD_CODE_FAILURE',
      payload: error.message,
    })
    console.log(error)
    throw error
  }
}

const resetPassword = (data) => async (dispatch) => {
  try {
    const response = await ResetPasswordMobile(data)
    dispatch({ type: 'RESET_PASSWORD_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'RESET_PASSWORD_FAILURE', payload: error.message })
    throw error
  }
}

const createUser = (data) => async (dispatch) => {
  try {
    const response = await Register(data)
    dispatch({
      type: 'CREATE_USER_SUCCESS',
      payload: response.data,
    })
    return response.data
  } catch (error) {
    dispatch({
      type: 'CREATE_USER_FAILURE',
      payload: error.message,
    })
    throw error
  }
}

const setUserWithLocalStorage = (localStorageData) => async (dispatch) => {
  try {
    dispatch({ type: 'SET_USER_LOCALSTORAGE_SUCCESS', payload: localStorageData });
    console.log('Action', localStorageData)
    return localStorageData
  } catch (error) {
    dispatch({type: 'SET_USER_LOCALSTORAGE_FAILURE', payload: error});
    console.log(error)
    throw error
  }
};

export {
  loginUser,
  loginWithUserId,
  logoutUser,
  confirmEmail,
  forgetPassword,
  checkForgetPasswordCode,
  resetPassword,
  createUser,
  setUserWithLocalStorage
}
