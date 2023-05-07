import { GetOneCritic } from '../../../services/critic'

export const getOneCritic = (id) => async (dispatch) => {
  try {
    const response = await GetOneCritic(id)
    dispatch({type: 'GET_ONE_CRITIC_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'GET_ONE_CRITIC_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};