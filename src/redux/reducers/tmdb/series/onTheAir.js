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

export default function onTheAirReducer(state = initialState, action) {
  switch (action.type) {
    case 'ON_THE_AIR_REQUEST':
      if (action.target === 'onTheAir') {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === 'onTheAirPagination') {
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
    case 'ON_THE_AIR_SUCCESS':
      if (action.target === 'onTheAir') {
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
      } else if (action.target === 'onTheAirPagination') {
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
    case 'ON_THE_AIR_FAILURE':
      if (action.target === 'onTheAir') {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === 'onTheAirPagination') {
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
    case 'RESET_ON_THE_AIR':
      return initialState
    default:
      return state
  }
}
