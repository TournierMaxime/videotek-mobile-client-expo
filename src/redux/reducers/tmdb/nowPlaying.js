
const initialState = {
  data: [],
  loading: false,
  error: null,
  };
  
  export default function nowPlayingReducer(state = initialState, action) {
    switch (action.type) {
      case 'NOW_PLAYING_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'NOW_PLAYING_SUCCESS':
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      case 'NOW_PLAYING_FAILURE':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  }
  