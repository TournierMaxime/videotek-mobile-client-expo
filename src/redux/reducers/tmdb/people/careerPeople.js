
const initialState = {
    data: [],
    loading: false,
    error: null,
    };
    
    export default function peopleCareerReducer(state = initialState, action) {
      switch (action.type) {
        case 'PEOPLE_CAREER_REQUEST':
          return {
            ...state,
            loading: true,
            error: null
          };
        case 'PEOPLE_CAREER_SUCCESS':
          return {
            ...state,
            data: action.payload,
            loading: false,
          };
        case 'PEOPLE_CAREER_FAILURE':
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
        default:
          return state;
      }
    }
    