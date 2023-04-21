
import { SerieCrew } from '../../../../services/tmdb'
  
export const serieCrew = (id) => async (dispatch) => {
  try {
    const response = await SerieCrew(id)
    dispatch({type: 'SERIE_CREW_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SERIE_CREW_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};