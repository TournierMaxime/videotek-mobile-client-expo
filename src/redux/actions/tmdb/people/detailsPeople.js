
import { PeopleCast } from '../../../../services/tmdb'
  
export const peopleCast = (id) => async (dispatch) => {
  try {
    const response = await PeopleCast(id)
    dispatch({type: 'PEOPLE_CAST_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'PEOPLE_CAST_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};