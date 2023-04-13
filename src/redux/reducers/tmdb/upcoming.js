
const initialState = {
    data: [],
    loading: false,
    error: null,
    };
    
    export default function upcomingReducer(state = initialState, action) {
      switch (action.type) {
        case 'UPCOMING_REQUEST':
          return {
            ...state,
            loading: true,
            error: null
          };
        case 'UPCOMING_SUCCESS':
          return {
            ...state,
            data: action.payload,
            loading: false,
          };
        case 'UPCOMING_FAILURE':
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
        default:
          return state;
      }
    }
    