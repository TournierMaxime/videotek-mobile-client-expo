import { SearchCritic } from '../../../services/critic'

export const searchCritic = (id, page) => async (dispatch) => {
  try {
    dispatch({ type: 'SEARCH_CRITIC_REQUEST'});
    const response = await SearchCritic(id, page)
    dispatch({type: 'SEARCH_CRITIC_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SEARCH_CRITIC_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};