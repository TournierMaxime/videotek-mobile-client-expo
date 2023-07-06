
import { SerieCrew } from '../../../../services/tmdb'
  
export const serieCrew = (id, language) => async (dispatch) => {
  try {
    const response = await SerieCrew(id, language)
    dispatch({type: 'SERIE_CREW_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SERIE_CREW_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetSerieCrew = () => ({
  type: 'RESET_SERIE_CREW',
})