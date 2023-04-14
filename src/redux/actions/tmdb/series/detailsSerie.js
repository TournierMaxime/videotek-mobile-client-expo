
import { SerieDetails } from '../../../../services/tmdb'
  
export const serieDetails = (id) => async (dispatch) => {
  try {
    const response = await SerieDetails(id)
    dispatch({type: 'SERIE_DETAILS_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SERIE_DETAILS_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};