import { SearchCritic } from '../../../services/critic'

export const searchCritic = (filters) => async (dispatch) => {
  try {
    const response = await SearchCritic(filters)
    dispatch({type: 'SEARCH_CRITIC_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SEARCH_CRITIC_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};