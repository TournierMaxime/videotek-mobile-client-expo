const initialState = {
  data: {},
  loading: false,
  error: null,
}

const searchCriticReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_CRITIC_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEARCH_CRITIC_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      }
    case 'SEARCH_CRITIC_FAILURE':
      return {
        ...state,
        data: {},
        error: action.payload,
        loading: false,
      }
    case 'SEARCH_CRITIC_RESET':
      return {
        ...initialState,
      }
    case 'SEARCH_CRITIC_BY_USER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEARCH_CRITIC_BY_USER_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      }
    case 'SEARCH_CRITIC_BY_USER_FAILURE':
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

const createCriticReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_CRITIC_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'CREATE_CRITIC_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'CREATE_CRITIC_FAILURE':
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

const getOneCriticReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ONE_CRITIC_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'GET_ONE_CRITIC_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'GET_ONE_CRITIC_FAILURE':
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

const updateCriticReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CRITIC_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'UPDATE_CRITIC_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'UPDATE_CRITIC_FAILURE':
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

const deleteCriticReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_CRITIC_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'DELETE_CRITIC_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'DELETE_CRITIC_FAILURE':
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
  searchCriticReducer,
  createCriticReducer,
  getOneCriticReducer,
  updateCriticReducer,
  deleteCriticReducer,
}
