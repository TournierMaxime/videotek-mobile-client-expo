import { CreateEpisode, DeleteEpisode } from '../../services/episodes'

const createEpisode = (data) => async (dispatch) => {
  try {
    const response = await CreateEpisode(data)
    const episodeId = response.data.episode.episodeId
    const seasonNumber = response.data.episode.seasonNumber

    dispatch({type: 'CREATE_EPISODE_SUCCESS', payload: response.data})
    dispatch({ type: 'MARK_EPISODE_WATCHED', payload: { serieId: data.serieId, seasonNumber, episodeNumber: data.episodeNumber, episodeId } });
    return response.data
  } catch (error) {
    dispatch({type: 'CREATE_EPISODE_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const deleteEpisode = (episodeId, serieId, seasonNumber, episodeNumber) => async (dispatch) => {
  try {
    const response = await DeleteEpisode(episodeId)
    dispatch({type: 'DELETE_EPISODE_SUCCESS', payload: response.data});
    dispatch({ type: 'UNMARK_EPISODE_WATCHED', payload: { serieId, seasonNumber, episodeNumber, episodeId } });
    return response.data
  } catch (error) {
    dispatch({type: 'DELETE_EPISODE_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export { createEpisode, deleteEpisode }