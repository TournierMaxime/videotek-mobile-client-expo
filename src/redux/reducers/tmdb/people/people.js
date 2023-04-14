
const initialState = {
    data: [],
    loading: false,
    error: null,
    };
    
    export default function peopleReducer(state = initialState, action) {
      switch (action.type) {
        case 'PEOPLE_REQUEST':
          return {
            ...state,
            loading: true,
            error: null
          };
        case 'PEOPLE_SUCCESS':
          return {
            ...state,
            data: action.payload,
            loading: false,
          };
        case 'PEOPLE_FAILURE':
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
        default:
          return state;
      }
    }
    