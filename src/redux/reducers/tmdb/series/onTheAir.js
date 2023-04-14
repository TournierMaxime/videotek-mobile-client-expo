
const initialState = {
    data: [],
    loading: false,
    error: null,
    };
    
    export default function onTheAirReducer(state = initialState, action) {
      switch (action.type) {
        case 'ON_THE_AIR_REQUEST':
          return {
            ...state,
            loading: true,
            error: null
          };
        case 'ON_THE_AIR_SUCCESS':
          return {
            ...state,
            data: action.payload,
            loading: false,
          };
        case 'ON_THE_AIR_FAILURE':
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
        default:
          return state;
      }
    }
    