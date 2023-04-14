
const initialState = {
    data: [],
    loading: false,
    error: null,
    };
    
    export default function movideDetailsReducer(state = initialState, action) {
      switch (action.type) {
        case 'MOVIE_DETAILS_REQUEST':
          return {
            ...state,
            loading: true,
            error: null
          };
        case 'MOVIE_DETAILS_SUCCESS':
          return {
            ...state,
            data: action.payload,
            loading: false,
          };
        case 'MOVIE_DETAILS_FAILURE':
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
        default:
          return state;
      }
    }
    