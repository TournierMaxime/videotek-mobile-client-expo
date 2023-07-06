
import { SeasonDetails } from '../../../../services/tmdb'
  
export const seasonDetails = (id, seasonNumber, language) => async (dispatch) => {
  try {
    const response = await SeasonDetails(id, seasonNumber, language)
    dispatch({type: 'SEASON_DETAILS_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SEASON_DETAILS_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetSeasonDetails = () => ({
  type: 'RESET_SEASON_DETAILS',
})