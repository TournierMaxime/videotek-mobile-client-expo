const initialState = {
  watchedSeasons: {},
  watchedEpisodes: {},
  seasonIds: {},
  episodeIds: {},
}

const watchedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MARK_EPISODE_WATCHED': {
      const { serieId, seasonNumber, episodeNumber } = action.payload;
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
        }
      };
    }
    case 'UNMARK_EPISODE_WATCHED': {
      const { serieId, seasonNumber, episodeNumber, episodeId} = action.payload;
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
        }
      };
    }
    case 'RESET_WATCHED':
      return initialState
    default:
      return state
  }
}


export { watchedReducer }
