
import { PeopleDetails } from '../../../../services/tmdb'
  
export const peopleDetails = (id, language) => async (dispatch) => {
  try {
    const response = await PeopleDetails(id, language)
    dispatch({type: 'PEOPLE_DETAILS_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'PEOPLE_DETAILS_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetPeopleDetails = () => ({
  type: 'RESET_PEOPLE_DETAILS',
})