const initialState = {
  data: {
    favorites: [],
    items: null,
    results: null,
    page: null,
    totalPages: null,
    loading: false,
    error: null,
  },
}

export default function searchFavoriteReducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_FAVORITE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEARCH_FAVORITE_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          favorites: action.payload.favorites,
          items: action.payload.items,
          results: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          loading: false,
        },
      }
    case 'SEARCH_FAVORITE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RESET_FAVORITES':
      return initialState
    default:
      return state
  }
}
