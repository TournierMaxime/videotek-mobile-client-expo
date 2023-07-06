const initialState = {
  data: {
    results: {},
  },
  loading: false,
  error: null,
}

export default function movieWatchProvidersReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'MOVIE_WATCH_PROVIDERS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'MOVIE_WATCH_PROVIDERS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'MOVIE_WATCH_PROVIDERS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_MOVIE_WATCH_PROVIDERS':
      return initialState
    default:
      return state
  }
}
