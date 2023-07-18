const initialState = {
  data: {},
  loading: false,
  error: null,
}

const oneUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'GET_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'USER_RESET':
      return {
        ...initialState,
      }
    default:
      return state
  }
}

const updateUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'UPDATE_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        oneUser: {
          data: {},
        },
      }
    case 'USER_RESET':
      return {
        ...initialState,
      }
    default:
      return state
  }
}

const deleteUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_USER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'DELETE_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'DELETE_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        oneUser: {
          data: {},
        },
      }
    default:
      return state
  }
}

export { oneUserReducer, updateUserReducer, deleteUserReducer }
