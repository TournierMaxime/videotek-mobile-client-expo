const initialState = {
    data: {},
    loading: false,
    error: null
};

export default function deleteFavoriteReducer(state = initialState, action) {
switch (action.type) {
  case 'DELETE_FAVORITE_REQUEST':
    return {
      ...state,
      loading: true,
      error: null
    };
  case 'DELETE_FAVORITE_SUCCESS':
    return {
      ...state,
        loading: false,
          data: action.payload
    };
  case 'DELETE_FAVORITE_FAILURE':
    return {
      ...state,
      loading: false,
        error: action.payload,
        data: {}
    };
  default:
    return state;
}
}