const initialState = {
  data: [],
  loading: false,
  error: null,
}

export default function serieCrewReducer(state = initialState, action) {
  switch (action.type) {
    case 'SERIE_CREW_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SERIE_CREW_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'SERIE_CREW_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_SERIE_CREW':
      return initialState
    default:
      return state
  }
}
