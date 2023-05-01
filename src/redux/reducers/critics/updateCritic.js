const initialState = {
    data: {},
    loading: false,
    error: null
};

export default function updateCriticReducer(state = initialState, action) {
switch (action.type) {
  case 'UPDATE_CRITIC_REQUEST':
    return {
      ...state,
      loading: true,
      error: null
    };
  case 'UPDATE_CRITIC_SUCCESS':
    return {
      ...state,
        loading: false,
          data: action.payload
    };
  case 'UPDATE_CRITIC_FAILURE':
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