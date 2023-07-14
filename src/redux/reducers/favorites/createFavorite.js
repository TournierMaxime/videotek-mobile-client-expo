const initialState = {
    data: {},
    loading: false,
    error: null
};

export default function createFavoriteReducer(state = initialState, action) {
switch (action.type) {
  case 'CREATE_FAVORITE_REQUEST':
    return {
      ...state,
      loading: true,
      error: null
    };
  case 'CREATE_FAVORITE_SUCCESS':
    return {
      ...state,
        loading: false,
          data: action.payload
    };
  case 'CREATE_FAVORITE_FAILURE':
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