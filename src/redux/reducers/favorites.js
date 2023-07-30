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

const searchFavoriteReducer = (state = initialState, action) => {
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

const createFavoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_FAVORITE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'CREATE_FAVORITE_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'CREATE_FAVORITE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    default:
      return state
  }
}

const getOneFavoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ONE_FAVORITE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'GET_ONE_FAVORITE_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'GET_ONE_FAVORITE_FAILURE':
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

const deleteFavoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_FAVORITE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'DELETE_FAVORITE_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'DELETE_FAVORITE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    default:
      return state
  }
}

export {
  searchFavoriteReducer,
  createFavoriteReducer,
  getOneFavoriteReducer,
  deleteFavoriteReducer,
}
