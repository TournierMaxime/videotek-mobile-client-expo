const initialState = {
  data: {
    results: [],
    page: null,
    total_pages: null,
    loading: false,
    error: null,
  },
  paginationData: {
    results: [],
    page: null,
    total_pages: null,
    loading: false,
    error: null,
  },
};

export default function nowPlayingReducer(state = initialState, action) {
  switch (action.type) {
    case 'NOW_PLAYING_REQUEST':
      if (action.target === 'nowPlaying') {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        };
      } else if (action.target === 'nowPlayingPagination') {
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
      case 'NOW_PLAYING_SUCCESS':
        if (action.target === 'nowPlaying') {
          return {
            ...state,
            data: {
              ...state.data,
              results: action.payload.results,
              page: action.payload.page,
              total_pages: action.payload.total_pages,
              loading: false,
            },
          };
        } else if (action.target === 'nowPlayingPagination') {
          return {
            ...state,
            paginationData: {
              ...state.paginationData,
              results: action.payload.results,
              page: action.payload.page,
              total_pages: action.payload.total_pages,
              loading: false,
            },
          };
        }
        break;
    case 'NOW_PLAYING_FAILURE':
      if (action.target === 'nowPlaying') {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        };
      } else if (action.target === 'nowPlayingPagination') {
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
