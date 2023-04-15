
import { People } from '../../../../services/tmdb'
  
export const peopleDetails = (id) => async (dispatch) => {
  try {
    const response = await People(id)
    dispatch({type: 'PEOPLE_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'PEOPLE_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};