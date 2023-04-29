const initialState = {
  data: {
    critics: [],
    currentPage: null,
    totalPages: null,
    loading: false,
    error: null,
  },
  paginationData: {
    critics: [],
    currentPage: null,
    totalPages: null,
    loading: false,
    error: null,
  },
}

export default function searchCriticReducer(state = initialState, action) {
    switch (action.type) {
      case 'SEARCH_CRITIC_REQUEST':
        if (action.target === 'searchCritic') {
          return {
            ...state,
            data: {
              ...state.data,
              loading: true,
              error: null,
            },
          };
        } else if (action.target === 'searchCriticPagination') {
          return {
            ...state,
            paginationData: {
              ...state.paginationData,
              loading: true,
              error: null,
            },
          };
        }
        break;
      case 'SEARCH_CRITIC_SUCCESS':
        if (action.target === 'searchCritic') {
          return {
            ...state,
            data: {
              ...state.data,
              critics: action.payload.critics,
              currentPage: action.payload.currentPage,
              totalPages: action.payload.totalPages,
              loading: false,
            },
          };
        } else if (action.target === 'searchCriticPagination') {
          return {
            ...state,
            paginationData: {
              ...state.paginationData,
              critics: action.payload.critics,
              currentPage: action.payload.currentPage,
              totalPages: action.payload.totalPages,
              loading: false,
            },
          };
        }
        break;
      case 'SEARCH_CRITIC_FAILURE':
        if (action.target === 'searchCritic') {
          return {
            ...state,
            data: {
              ...state.data,
              error: action.payload,
              loading: false,
            },
          };
        } else if (action.target === 'searchCriticPagination') {
          return {
            ...state,
            paginationData: {
              ...state.paginationData,
              error: action.payload,
              loading: false,
            },
          };
        }
        break;
      default:
        return state;
    }
}
