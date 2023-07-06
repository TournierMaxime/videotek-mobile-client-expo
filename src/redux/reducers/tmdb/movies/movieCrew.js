const initialState = {
  data: [],
  loading: false,
  error: null,
}

export default function movieCrewReducer(state = initialState, action) {
  switch (action.type) {
    case 'MOVIE_CREW_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'MOVIE_CREW_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'MOVIE_CREW_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_MOVIE_CREW':
      return initialState
    default:
      return state
  }
}
