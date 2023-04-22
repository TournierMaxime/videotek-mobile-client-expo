import AsyncStorage from '@react-native-async-storage/async-storage';

const initState = {
  isAuthenticated: false,
  data: {
    token: null,
    user: {}
  }
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS':
      AsyncStorage.setItem('userData', JSON.stringify(action.payload));
      return {
        ...state,
        data: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT_USER_SUCCESS':
      AsyncStorage.removeItem('userData');
      return {
        ...state,
        isAuthenticated: false,
        data: {
          token: null,
          user: {}
        }
      };
    default:
      return state;
  }
};

export default authReducer;