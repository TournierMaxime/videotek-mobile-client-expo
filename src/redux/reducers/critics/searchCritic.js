const initialState = {
    data: {},
    loading: false,
    error: null
}

export default function searchCriticReducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_CRITIC_REQUEST':
      return {
        ...state,
          loading: true,
          error: null,
      };
    case 'SEARCH_CRITIC_SUCCESS':
      return {
        ...state,
          data: action.payload,
          loading: false,
          error: null,
      };
    case 'SEARCH_CRITIC_FAILURE':
      return {
        ...state,
          data: {},
          error: action.payload,
          loading: false,
      };
      case 'SEARCH_CRITIC_BY_USER_REQUEST':
        return {
          ...state,
            loading: true,
            error: null,
        };
      case 'SEARCH_CRITIC_BY_USER_SUCCESS':
        return {
          ...state,
            data: action.payload,
            loading: false,
            error: null,
        };
      case 'SEARCH_CRITIC_BY_USER_FAILURE':
        return {
          ...state,
            data: {},
            error: action.payload,
            loading: false,
        };
    default:
      return state;
  }
}
