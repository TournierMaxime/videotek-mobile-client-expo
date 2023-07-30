const initialState = {
  watchedSeasons: {},
  watchedEpisodes: {},
  seasonIds: {},
  episodeIds: {},
}

const watchedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MARK_SEASON_WATCHED': {
      const { serieId, seasonNumber, seasonId, totalWatchedEpisodes } = action.payload
      return {
        ...state,
        watchedSeasons: {
          ...state.watchedSeasons,
          [serieId]: {
            ...(state.watchedSeasons[serieId] || {}),
            [seasonNumber]: {
              ...(state.watchedSeasons[serieId]?.[seasonNumber] || {}),
              seasonId,
              watched: true,
              totalWatchedEpisodes
            },
          },
        },
        seasonIds: {
          ...state.seasonIds,
          [serieId]: {
            ...(state.seasonIds[serieId] || {}),
            [seasonNumber]: seasonId
          },
        },
      }
    }
    case 'UNMARK_SEASON_WATCHED': {
      const { serieId, seasonNumber, seasonId } = action.payload
      return {
        ...state,
        watchedSeasons: {
          ...state.watchedSeasons,
          [serieId]: {
            ...(state.watchedSeasons[serieId] || {}),
            [seasonNumber]: {
              seasonId,
              watched: false,
              totalWatchedEpisodes: 0
            },
          },
        },
        seasonIds: {
          ...state.seasonIds,
          [serieId]: {
            ...(state.seasonIds[serieId] || {}),
            [seasonNumber]: seasonId
          },
        },
      }
    }
    case 'MARK_EPISODE_WATCHED': {
      const { serieId, seasonNumber, episodeNumber } = action.payload
      return {
        ...state,
        watchedEpisodes: {
          ...state.watchedEpisodes,
          [serieId]: {
            ...(state.watchedEpisodes[serieId] || {}),
            [seasonNumber]: {
              ...(state.watchedEpisodes[serieId]?.[seasonNumber] || {}),
              [episodeNumber]: true,
            },
          },
        },
      }
    }
    case 'UNMARK_EPISODE_WATCHED': {
      const { serieId, seasonNumber, episodeNumber } = action.payload
      const updatedWatchedEpisodes = {
        ...state.watchedEpisodes[serieId][seasonNumber],
      }
      delete updatedWatchedEpisodes[episodeNumber]
      return {
        ...state,
        watchedEpisodes: {
          ...state.watchedEpisodes,
          [serieId]: {
            ...state.watchedEpisodes[serieId],
            [seasonNumber]: updatedWatchedEpisodes,
          },
        },
      }
    }
    case 'SEASON_CREATED':
      return {
        ...state,
        watchedSeasons: {
          ...state.watchedSeasons,
          [action.payload.serieId]: {
            ...state.watchedSeasons[action.payload.serieId],
            [action.payload.seasonNumber]: {
              ...(state.watchedSeasons[action.payload.serieId]?.[action.payload.seasonNumber] || {}),
              seasonId: action.payload.seasonId,
            },
          },
        },
      }
    
    case 'EPISODE_CREATED':
      return {
        ...state,
        watchedEpisodes: {
          ...state.watchedEpisodes,
          [action.payload.serieId]: {
            ...state.watchedEpisodes[action.payload.serieId],
            [action.payload.seasonNumber]: {
              ...state.watchedEpisodes[action.payload.serieId]?.[
                action.payload.seasonNumber
              ],
              [action.payload.episodeNumber]: action.payload.episodeId,
            },
          },
        },
      }
    default:
      return state
  }
}

export { watchedReducer }
