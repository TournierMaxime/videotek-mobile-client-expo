
const initialState = {
    data: [],
    loading: false,
    error: null,
    };
    
    export default function popularReducer(state = initialState, action) {
      switch (action.type) {
        case 'POPULAR_REQUEST':
          return {
            ...state,
            loading: true,
            error: null
          };
        case 'POPULAR_SUCCESS':
          return {
            ...state,
            data: action.payload,
            loading: false,
          };
        case 'POPULAR_FAILURE':
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
        default:
          return state;
      }
    }
    