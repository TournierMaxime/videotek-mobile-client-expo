const initialState = {
  data: {
    watchLists: [],
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

const searchWatchListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_WATCHLIST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEARCH_WATCHLIST_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          watchLists: action.payload.watchLists,
          items: action.payload.items,
          results: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          loading: false,
        },
      }
    case 'SEARCH_WATCHLIST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RESET_WATCHLISTS':
      return initialState
    default:
      return state
  }
}

const createWatchListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_WATCHLIST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'CREATE_WATCHLIST_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'CREATE_WATCHLIST_FAILURE':
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

const getOneWatchListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ONE_WATCHLIST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'GET_ONE_WATCHLIST_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'GET_ONE_WATCHLIST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RESET_WATCHLISTS':
      return initialState
    default:
      return state
  }
}

const deleteWatchListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_WATCHLIST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'DELETE_WATCHLIST_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'DELETE_WATCHLIST_FAILURE':
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
  searchWatchListReducer,
  createWatchListReducer,
  getOneWatchListReducer,
  deleteWatchListReducer,
}
