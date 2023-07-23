const initialState = {
  data: {
    likes: [],
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

const searchLikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_LIKE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEARCH_LIKE_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          likes: action.payload.likes,
          items: action.payload.items,
          results: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          loading: false,
        },
      }
    case 'SEARCH_LIKE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RESET_LIKE':
      return initialState
    default:
      return state
  }
}

const createLikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_LIKE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'CREATE_LIKE_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'CREATE_LIKE_FAILURE':
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

const getOneLikePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ONE_LIKE_POST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'GET_ONE_LIKE_POST_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'GET_ONE_LIKE_POST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RESET_LIKE':
      return initialState
    default:
      return state
  }
}

const getOneLikeCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ONE_LIKE_COMMENT_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'GET_ONE_LIKE_COMMENT_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'GET_ONE_LIKE_COMMENT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RESET_LIKE':
      return initialState
    default:
      return state
  }
}

const getOneLikeCriticReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ONE_LIKE_CRITIC_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'GET_ONE_LIKE_CRITIC_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'GET_ONE_LIKE_CRITIC_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RESET_LIKE':
      return initialState
    default:
      return state
  }
}

const deleteLikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_LIKE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'DELETE_LIKE_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'DELETE_LIKE_FAILURE':
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
  searchLikeReducer,
  createLikeReducer,
  getOneLikePostReducer,
  getOneLikeCommentReducer,
  getOneLikeCriticReducer,
  deleteLikeReducer,
}
