
const initialState = {
    data: [],
    loading: false,
    error: null,
    };
    
    export default function serieDetailsReducer(state = initialState, action) {
      switch (action.type) {
        case 'SERIE_DETAILS_REQUEST':
          return {
            ...state,
            loading: true,
            error: null
          };
        case 'SERIE_DETAILS_SUCCESS':
          return {
            ...state,
            data: action.payload,
            loading: false,
          };
        case 'SERIE_DETAILS_FAILURE':
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
        default:
          return state;
      }
    }
    