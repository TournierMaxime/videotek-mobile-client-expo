const initialState = {
    data: {},
    loading: false,
    error: null
};

export default function oneUserReducer(state = initialState, action) {
switch (action.type) {
  case 'GET_USER_REQUEST':
    return {
      ...state,
      loading: true,
      error: null
    };
  case 'GET_USER_SUCCESS':
    return {
      ...state,
        loading: false,
          data: action.payload
    };
  case 'GET_USER_FAILURE':
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