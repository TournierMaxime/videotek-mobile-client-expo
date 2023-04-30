const initialState = {
    data: {},
    loading: false,
    error: null
};

export default function deleteCriticReducer(state = initialState, action) {
switch (action.type) {
  case 'DELETE_CRITIC_REQUEST':
    return {
      ...state,
      loading: true,
      error: null
    };
  case 'DELETE_CRITIC_SUCCESS':
    return {
      ...state,
        loading: false,
          data: action.payload
    };
  case 'DELETE_CRITIC_FAILURE':
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