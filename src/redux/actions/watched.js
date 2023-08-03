import { UpdateWathed } from '../../services/watched'

const markSeasonWatched = (serieId, seasonNumber, seasonId) => ({
  type: 'MARK_SEASON_WATCHED',
  payload: { serieId, seasonNumber, seasonId},
})

const markEpisodeWatched = (serieId, seasonNumber, episodeNumber) => ({
  type: 'MARK_EPISODE_WATCHED',
  payload: { serieId, seasonNumber, episodeNumber},
})

const unmarkEpisodeWatched = (serieId, seasonNumber, episodeNumber, episodeId) => ({
  type: 'UNMARK_EPISODE_WATCHED',
  payload: { serieId, seasonNumber, episodeNumber, episodeId},
})

const updateWatched = (data, userId, watchListId) => async (dispatch) => {
  try {
    const response = await UpdateWathed(data, userId, watchListId)
    dispatch({type: 'UPDATE_WATCHED_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'UPDATE_WATCHED_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const resetWatched = () => ({
  type: 'RESET_WATCHED',
})

export {
  markSeasonWatched,
  markEpisodeWatched,
  unmarkEpisodeWatched,
  updateWatched,
  resetWatched
}
