
const initialState = {
    data: [],
    loading: false,
    error: null,
    };
    
    export default function serieTrailerReducer(state = initialState, action) {
      switch (action.type) {
        case 'SERIE_TRAILER_REQUEST':
          return {
            ...state,
            loading: true,
            error: null
          };
        case 'SERIE_TRAILER_SUCCESS':
          return {
            ...state,
            data: action.payload,
            loading: false,
          };
        case 'SERIE_TRAILER_FAILURE':
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
        default:
          return state;
      }
    }
    