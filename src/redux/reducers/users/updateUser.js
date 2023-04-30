const initialState = {
    data: {},
    loading: false,
    error: null
};

export default function updateUserReducer(state = initialState, action) {
switch (action.type) {
  case 'UPDATE_USER_REQUEST':
    return {
      ...state,
      loading: true,
      error: null
    };
  case 'UPDATE_USER_SUCCESS':
    return {
      ...state,
        loading: false,
          data: action.payload
    };
  case 'UPDATE_USER_FAILURE':
    return {
      ...state,
      loading: false,
        error: action.payload,
        oneUser: {
          data: {}
      }
    };
  default:
    return state;
}
}