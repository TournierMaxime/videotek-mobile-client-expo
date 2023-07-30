import { CreateEpisode, DeleteEpisode } from '../../services/episodes'

const createEpisode = (data) => async (dispatch) => {
  try {
    const response = await CreateEpisode(data)
    dispatch({type: 'CREATE_EPISODE_SUCCESS', payload: response.data})
    dispatch({ type: 'EPISODE_CREATED', payload: { serieId: data.serieId, seasonId: data.seasonId, episodeNumber: data.episodeNumber, episodeId: response.data.episodeId } })
    return response.data
  } catch (error) {
    dispatch({type: 'CREATE_EPISODE_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const deleteEpisode = (episodeId) => async (dispatch) => {
  try {
    const response = await DeleteEpisode(episodeId)
    dispatch({type: 'DELETE_EPISODE_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'DELETE_EPISODE_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export { createEpisode, deleteEpisode }