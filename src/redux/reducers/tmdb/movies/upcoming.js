const initialState = {
  data: {
    dates: {},
    results: [],
    page: null,
    total_pages: null,
    loading: false,
    error: null,
  },
  paginationData: {
    dates: {},
    results: [],
    page: null,
    total_pages: null,
    loading: false,
    error: null,
  },
}

export default function upcomingReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPCOMING_REQUEST':
      if (action.target === 'upcoming') {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === 'upcomingPagination') {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            loading: true,
            error: null,
          },
        }
      }
      break
    case 'UPCOMING_SUCCESS':
      if (action.target === 'upcoming') {
        return {
          ...state,
          data: {
            ...state.data,
            dates: action.payload.dates,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      } else if (action.target === 'upcomingPagination') {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            dates: action.payload.dates,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      }
      break
    case 'UPCOMING_FAILURE':
      if (action.target === 'upcoming') {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === 'upcomingPagination') {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            error: action.payload,
            loading: false,
          },
        }
      }
      break
    case 'RESET_UPCOMING':
      return initialState
    default:
      return state
  }
}
