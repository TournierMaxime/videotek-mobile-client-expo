import { DeleteCritic } from '../../../services/critic'

export const deleteCritic = (id) => async (dispatch) => {
  try {
    const response = await DeleteCritic(id)
    dispatch({type: 'DELETE_CRITIC_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'DELETE_CRITIC_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};