const initialState = {
  data: {
    category: [],
    gifs: [],
    items: null,
    results: null,
    page: null,
    totalPages: null,
    loading: false,
    error: null,
  },
  loading: false,
  error: null,
}

const searchCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_CATEGORY_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEARCH_CATEGORY_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          category: action.payload.category,
          items: action.payload.items,
          results: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          loading: false,
        },
      }
    case 'SEARCH_CATEGORY_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RESET_CATEGORY':
      return initialState
    default:
      return state
  }
}

const searchGifReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_GIF_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEARCH_GIF_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          gifs: action.payload.gifs,
          items: action.payload.items,
          results: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          loading: false,
        },
      }
    case 'SEARCH_GIF_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RESET_GIF':
      return initialState
    default:
      return state
  }
}

const getOneGifReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ONE_GIF_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'GET_ONE_GIF_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'GET_ONE_GIF_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RESET_GIF':
      return initialState
    default:
      return state
  }
}

export { searchGifReducer, getOneGifReducer, searchCategoryReducer }
