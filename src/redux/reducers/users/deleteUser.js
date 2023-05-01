const initialState = {
    data: {},
    loading: false,
    error: null
};

export default function deleteUserReducer(state = initialState, action) {
switch (action.type) {
  case 'DELETE_USER_REQUEST':
    return {
      ...state,
      loading: true,
      error: null
    };
  case 'DELETE_USER_SUCCESS':
    return {
      ...state,
        loading: false,
          data: action.payload
    };
  case 'DELETE_USER_FAILURE':
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