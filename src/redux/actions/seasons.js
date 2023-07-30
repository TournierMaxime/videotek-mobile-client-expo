import { CreateSeason, GetOneSeason, DeleteSeason } from '../../services/seasons'

const createSeason = (data) => async (dispatch) => {
  try {
    const response = await CreateSeason(data)
    const seasonId = response.data.season.seasonId

    dispatch({type: 'CREATE_SEASON_SUCCESS', payload: response.data});
    dispatch({ type: 'SEASON_CREATED', payload: { serieId: data.serieId, seasonNumber: data.seasonNumber, seasonId, watched: true, totalWatchedEpisodes: data.totalWatchedEpisodes } });
    dispatch({ type: 'MARK_SEASON_WATCHED', payload: { serieId: data.serieId, seasonNumber: data.seasonNumber, seasonId, watched: true, totalWatchedEpisodes: data.totalWatchedEpisodes } });
    return response.data
  } catch (error) {
    dispatch({type: 'CREATE_SEASON_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const getOneSeason = (userId, seasonId) => async (dispatch) => {
  try {
    const response = await GetOneSeason(userId, seasonId)
    dispatch({type: 'GET_ONE_SEASON_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'GET_ONE_SEASON_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const deleteSeason = (seasonId, serieId, seasonNumber) => async (dispatch) => {
  try {
    const response = await DeleteSeason(seasonId)
    dispatch({type: 'DELETE_SEASON_SUCCESS', payload: response.data});
    dispatch({ type: 'UNMARK_SEASON_WATCHED', payload: { seasonId, serieId, seasonNumber, watched: false } });
    return response.data
  } catch (error) {
    dispatch({type: 'DELETE_SEASON_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export { createSeason, getOneSeason, deleteSeason }