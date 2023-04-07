import {LOGIN_USER_SUCCESS, LOGOUT_USER} from '../../actions/types/auth';

const initState = {
  isAuthenticated: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
