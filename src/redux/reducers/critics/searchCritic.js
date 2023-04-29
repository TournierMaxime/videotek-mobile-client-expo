const initialState = {
  data: [],
  loading: false,
  error: null,
}

export default function searchCriticReducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_CRITIC_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEARCH_CRITIC_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'SEARCH_CRITIC_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
      }
    default:
      return state
  }
}
