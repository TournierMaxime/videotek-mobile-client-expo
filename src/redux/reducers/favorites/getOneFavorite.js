const initialState = {
    data: {},
    loading: false,
    error: null
};

export default function getOneFavoriteReducer(state = initialState, action) {
switch (action.type) {
  case 'GET_ONE_FAVORITE_REQUEST':
    return {
      ...state,
      loading: true,
      error: null
    };
  case 'GET_ONE_FAVORITE_SUCCESS':
    return {
      ...state,
        loading: false,
          data: action.payload
    };
  case 'GET_ONE_FAVORITE_FAILURE':
    return {
      ...state,
      loading: false,
        error: action.payload,
        data: {}
    };
  case 'RESET_FAVORITES':
    return initialState
  default:
    return state;
}
}