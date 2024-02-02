import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  isAuthenticated: false,
  data: {},
  code: null,
  error: null,
  forgetPasswordSuccess: false,
  forgetPasswordError: null,
  checkForgetPasswordCodeSuccess: false,
  checkForgetPasswordCodeError: null,
  resetPasswordSuccess: false,
  resetPasswordError: null,
  user: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS':
      AsyncStorage.setItem('userData', JSON.stringify(action.payload))
      return {
        ...state,
        data: action.payload,
        isAuthenticated: true,
      }
    case 'LOGOUT_USER_SUCCESS':
      AsyncStorage.removeItem('userData')
      return {
        ...state,
        isAuthenticated: false,
        data: {},
      }
    case 'SET_USER_LOCALSTORAGE_SUCCESS':
      return {
        ...state,
        data: action.payload,
      }
    case 'SET_USER_LOCALSTORAGE_FAILURE':
      return {
        ...state,
        error: action.payload,
        data: {},
      }
    default:
      return state
  }
}

const confirmEmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONFIRM_EMAIL_SUCCESS':
      return {
        ...state,
        code: action.payload,
        error: null,
      }
    case 'CONFIRM_EMAIL_FAILURE':
      return {
        ...state,
        code: null,
        error: action.payload,
      }
    default:
      return state
  }
}

const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FORGET_PASSWORD_SUCCESS':
      return {
        ...state,
        forgetPasswordSuccess: true,
        forgetPasswordError: null,
      }
    case 'FORGET_PASSWORD_FAILURE':
      return {
        ...state,
        forgetPasswordSuccess: false,
        forgetPasswordError: action.payload,
      }
    case 'CHECK_FORGET_PASSWORD_CODE_SUCCESS':
      return {
        ...state,
        checkForgetPasswordCodeSuccess: true,
        checkForgetPasswordCodeError: null,
      }
    case 'CHECK_FORGET_PASSWORD_CODE_FAILURE':
      return {
        ...state,
        checkForgetPasswordCodeSuccess: false,
        checkForgetPasswordCodeError: action.payload,
      }
    case 'RESET_PASSWORD_SUCCESS':
      return { ...state, resetPasswordSuccess: true, resetPasswordError: null }
    case 'RESET_PASSWORD_FAILURE':
      return {
        ...state,
        resetPasswordSuccess: false,
        resetPasswordError: action.payload,
      }
    default:
      return state
  }
}

const registerUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
      }
    case 'CREATE_USER_FAILURE':
      return {
        ...state,
        user: null,
        error: action.payload,
      }
    default:
      return state
  }
}

export {
  authReducer,
  confirmEmailReducer,
  passwordReducer,
  registerUserReducer,
}
