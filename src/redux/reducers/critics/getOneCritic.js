const initialState = {
    data: {},
    loading: false,
    error: null
};

export default function getOneCriticReducer(state = initialState, action) {
switch (action.type) {
  case 'GET_ONE_CRITIC_REQUEST':
    return {
      ...state,
      loading: true,
      error: null
    };
  case 'GET_ONE_CRITIC_SUCCESS':
    return {
      ...state,
        loading: false,
          data: action.payload
    };
  case 'GET_ONE_CRITIC_FAILURE':
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