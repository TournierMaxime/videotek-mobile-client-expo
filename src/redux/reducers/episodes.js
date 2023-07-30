const initialState = {
    data: {},
    loading: false,
    error: null,
  }
  
  const createEpisodeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_EPISODE_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        }
      case 'CREATE_EPISODE_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload,
        }
      case 'CREATE_EPISODE_FAILURE':
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
  
  const deleteEpisodeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'DELETE_EPISODE_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        }
      case 'DELETE_EPISODE_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.payload,
        }
      case 'DELETE_EPISODE_FAILURE':
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
  
  export { createEpisodeReducer, deleteEpisodeReducer }
  