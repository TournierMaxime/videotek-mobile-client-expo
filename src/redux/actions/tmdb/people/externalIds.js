
import { PeopleExternalIds } from '../../../../services/tmdb'
  
export const peopleExternalIds = (id) => async (dispatch) => {
  try {
    const response = await PeopleExternalIds(id)
    dispatch({type: 'PEOPLE_EXTERNAL_IDS_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'PEOPLE_EXTERNAL_IDS_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetPeopleExternalIds = () => ({
  type: 'RESET_PEOPLE_EXTERNAL_IDS',
})