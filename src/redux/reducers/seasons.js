const initialState = {
  data: {},
  loading: false,
  error: null,
}

const createSeasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_SEASON_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'CREATE_SEASON_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'CREATE_SEASON_FAILURE':
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

const getOneSeasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ONE_SEASON_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'GET_ONE_SEASON_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'GET_ONE_SEASON_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RESET_SEASONS':
      return initialState
    default:
      return state
  }
}

const updateSeasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SEASON_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'UPDATE_SEASON_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'UPDATE_SEASON_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RESET_SEASONS':
      return initialState
    default:
      return state
  }
}

const deleteSeasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_SEASON_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'DELETE_SEASON_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'DELETE_SEASON_FAILURE':
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
  createSeasonReducer,
  getOneSeasonReducer,
  updateSeasonReducer,
  deleteSeasonReducer,
}
