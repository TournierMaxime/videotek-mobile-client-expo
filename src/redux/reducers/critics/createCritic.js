const initialState = {
    data: {},
    loading: false,
    error: null
};

export default function createCriticReducer(state = initialState, action) {
switch (action.type) {
  case 'CREATE_CRITIC_REQUEST':
    return {
      ...state,
      loading: true,
      error: null
    };
  case 'CREATE_CRITIC_SUCCESS':
    return {
      ...state,
        loading: false,
          data: action.payload
    };
  case 'CREATE_CRITIC_FAILURE':
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