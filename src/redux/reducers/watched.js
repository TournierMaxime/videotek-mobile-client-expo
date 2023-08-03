const initialState = {
  watchedSeasons: {},
  watchedEpisodes: {},
  seasonIds: {},
  episodeIds: {},
  data: {}
}

const watchedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MARK_SEASON_WATCHED': {
      const { serieId, seasonNumber, seasonId } = action.payload;
      return {
        ...state,
        watchedSeasons: {
          ...state.watchedSeasons,
          [serieId]: {
            ...(state.watchedSeasons[serieId] || {}),
            [seasonNumber]: true,
            seasonId
          }
        },
        seasonIds: {
          ...state.seasonIds,
          [serieId]: {
            ...(state.seasonIds[serieId] || {}),
            [seasonNumber]: {
              ...(state.seasonIds[serieId]?.[seasonNumber] || {}),
              seasonId,
            }
          }
        }
      };
    }
    
    case 'MARK_EPISODE_WATCHED': {
      const { serieId, seasonNumber, episodeNumber, episodeId } = action.payload;
      return {
        ...state,
        watchedEpisodes: {
          ...state.watchedEpisodes,
          [serieId]: {
            ...(state.watchedEpisodes[serieId] || {}),
            [seasonNumber]: [
              ...(state.watchedEpisodes[serieId]?.[seasonNumber] || []),
              episodeNumber
            ]
          }
        },
        episodeIds: {
          ...state.episodeIds,
          [serieId]: {
            ...(state.episodeIds[serieId] || {}),
            [seasonNumber]: {
              ...(state.episodeIds[serieId]?.[seasonNumber] || {}),
              [episodeNumber]: episodeId,
            }
          }
        }
      };
    }
    case 'UNMARK_EPISODE_WATCHED': {
      const { serieId, seasonNumber, episodeNumber, episodeId} = action.payload;
      const { [episodeNumber]: value, ...remainingEpisodes } = state.episodeIds[serieId]?.[seasonNumber] || {};
      return {
        ...state,
        watchedEpisodes: {
          ...state.watchedEpisodes,
          [serieId]: {
            ...(state.watchedEpisodes[serieId] || {}),
            [seasonNumber]: (state.watchedEpisodes[serieId]?.[seasonNumber] || []).filter(
              (episode) => episode !== episodeNumber
            ),
            episodeId
          }
        },
        episodeIds: {
          ...state.episodeIds,
          [serieId]: {
            ...(state.episodeIds[serieId] || {}),
            [seasonNumber]: remainingEpisodes,
          }
        }
      };
    }
    case 'RESET_WATCHED':
      return initialState
    default:
      return state
  }
}

const updateWatchedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_WATCHED_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'UPDATE_WATCHED_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'UPDATE_WATCHED_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    default:
      return state
  }
}


export { watchedReducer, updateWatchedReducer }
