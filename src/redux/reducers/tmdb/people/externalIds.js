const initialState = {
  data: [],
  loading: false,
  error: null,
}

export default function peopleExternalIdsReducer(state = initialState, action) {
  switch (action.type) {
    case 'PEOPLE_EXTERNAL_IDS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'PEOPLE_EXTERNAL_IDS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'PEOPLE_EXTERNAL_IDS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_PEOPLE_EXTERNAL_IDS':
      return initialState
    default:
      return state
  }
}
