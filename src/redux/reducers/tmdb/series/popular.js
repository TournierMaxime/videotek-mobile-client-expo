const initialState = {
  data: {
    results: [],
    page: null,
    total_pages: null,
    loading: false,
    error: null,
  },
  paginationData: {
    results: [],
    page: null,
    total_pages: null,
    loading: false,
    error: null,
  },
}

export default function popularReducer(state = initialState, action) {
  switch (action.type) {
    case 'POPULAR_REQUEST':
      if (action.target === 'popular') {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === 'popularPagination') {
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
    case 'POPULAR_SUCCESS':
      if (action.target === 'popular') {
        return {
          ...state,
          data: {
            ...state.data,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      } else if (action.target === 'popularPagination') {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      }
      break
    case 'POPULAR_FAILURE':
      if (action.target === 'popular') {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === 'popularPagination') {
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
    case 'RESET_POPULAR':
      return initialState
    default:
      return state
  }
}
