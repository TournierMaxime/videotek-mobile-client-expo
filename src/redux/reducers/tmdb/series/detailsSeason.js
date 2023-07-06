const initialState = {
  data: [],
  loading: false,
  error: null,
}

export default function seasonDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SEASON_DETAILS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEASON_DETAILS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'SEASON_DETAILS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_SEASON_DETAILS':
      return initialState
    default:
      return state
  }
}
