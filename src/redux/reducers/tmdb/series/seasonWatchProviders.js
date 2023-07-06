const initialState = {
  data: {
    results: {},
  },
  seasonWatchProviders: [],
  loading: false,
  error: null,
}

export default function seasonWatchProvidersReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'SEASON_WATCH_PROVIDERS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEASON_WATCH_PROVIDERS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'SEASON_WATCH_PROVIDERS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'UPDATE_SEASON_WATCH_PROVIDERS':
      return {
        ...state,
        seasonWatchProviders: state.seasonWatchProviders.concat({
          seasonNumber: action.payload.seasonNumber,
          watchProviders: action.payload.watchProviders,
        }),
      }
    case 'RESET_SEASON_WATCH_PROVIDERS':
      return initialState
    default:
      return state
  }
}
