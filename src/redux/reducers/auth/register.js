const initialState = {
    user: null,
    error: null,
};
  // Ce code définit un reducer pour gérer l'état d'enregistrement d'un utilisateur dans l'application.
  export default function registerUserReducer(state = initialState, action) {
    switch (action.type) {
      case 'CREATE_USER_SUCCESS':
        return {
          ...state,
          user: action.payload,
          error: null,
        };
      case 'CREATE_USER_FAILURE':
        return {
          ...state,
          user: null,
          error: action.payload,
        };
      default:
        return state;
    }
  }
  