const initialState = {
  data: {
    results: [],
  },
  loading: false,
  error: null,
}

export default function releaseDatesReducer(state = initialState, action) {
  switch (action.type) {
    case 'RELEASE_DATES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'RELEASE_DATES_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'RELEASE_DATES_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_RELEASE_DATES':
      return initialState
    default:
      return state
  }
}
