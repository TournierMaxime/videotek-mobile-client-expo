
const initialState = {
    data: [],
    loading: false,
    error: null,
    };
    
    export default function searchReducer(state = initialState, action) {
      switch (action.type) {
        case 'SEARCH_REQUEST':
          return {
            ...state,
            loading: true,
            error: null
          };
        case 'SEARCH_SUCCESS':
          return {
            ...state,
            data: action.payload,
            loading: false,
          };
        case 'SEARCH_FAILURE':
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
        default:
          return state;
      }
    }
    