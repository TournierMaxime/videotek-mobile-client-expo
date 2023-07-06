
import { PeopleCareer } from '../../../../services/tmdb'
  
export const peopleCareer = (id, language) => async (dispatch) => {
  try {
    const response = await PeopleCareer(id, language)
    dispatch({type: 'PEOPLE_CAREER_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'PEOPLE_CAREER_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetPeopleCareer = () => ({
  type: 'RESET_PEOPLE_CAREER',
})