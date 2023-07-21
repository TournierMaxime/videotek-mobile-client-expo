const initialState = {
  data: {
    posts: [],
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

const searchPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_POST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEARCH_POST_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          posts: action.payload.posts,
          items: action.payload.items,
          results: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          loading: false,
        },
      }
    case 'SEARCH_POST_FAILURE':
      return {
        ...state,
        data: {},
        error: action.payload,
        loading: false,
      }
    case 'SEARCH_POST_RESET':
      return {
        ...initialState,
      }
    case 'SEARCH_POST_BY_USER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEARCH_POST_BY_USER_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          posts: action.payload.posts,
          items: action.payload.items,
          results: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          loading: false,
        },
      }
    case 'SEARCH_POST_BY_USER_FAILURE':
      return {
        ...state,
        data: {},
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

const createPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_POST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'CREATE_POST_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'CREATE_POST_FAILURE':
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

const getOnePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ONE_POST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'GET_ONE_POST_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'GET_ONE_POST_FAILURE':
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

const updatePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_POST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'UPDATE_POST_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'UPDATE_POST_FAILURE':
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

const deletePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_POST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'DELETE_POST_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'DELETE_POST_FAILURE':
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
  searchPostReducer,
  createPostReducer,
  getOnePostReducer,
  updatePostReducer,
  deletePostReducer,
}
