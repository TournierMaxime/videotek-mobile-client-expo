const initialState = {
    code: null,
    error: null,
};

  export default function confirmEmailReducer(state = initialState, action) {
    switch (action.type) {
      case 'CONFIRM_EMAIL_SUCCESS':
        return {
          ...state,
          code: action.payload,
          error: null,
        };
      case 'CONFIRM_EMAIL_FAILURE':
        return {
          ...state,
          code: null,
          error: action.payload,
        };
      default:
        return state;
    }
  }
  