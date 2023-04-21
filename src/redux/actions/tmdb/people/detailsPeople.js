
import { PeopleDetails } from '../../../../services/tmdb'
  
export const peopleDetails = (id) => async (dispatch) => {
  try {
    const response = await PeopleDetails(id)
    dispatch({type: 'PEOPLE_DETAILS_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'PEOPLE_DETAILS_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};