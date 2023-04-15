
import { PeopleCareer } from '../../../../services/tmdb'
  
export const peopleCareer = (id) => async (dispatch) => {
  try {
    const response = await PeopleCareer(id)
    dispatch({type: 'PEOPLE_CAREER_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'PEOPLE_CAREER_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};