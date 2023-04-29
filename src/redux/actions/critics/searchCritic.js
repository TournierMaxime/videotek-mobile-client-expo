import { SearchCritic } from '../../../services/critic'

export const searchCritic = (filters, target = 'searchCritic') => async (dispatch) => {
  try {
    dispatch({ type: 'SEARCH_CRITIC_REQUEST', target });
    const response = await SearchCritic(filters)
    dispatch({type: 'SEARCH_CRITIC_SUCCESS', payload: response.data, target});
    return response.data
  } catch (error) {
    dispatch({type: 'SEARCH_CRITIC_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};