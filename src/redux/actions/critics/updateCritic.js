import { UpdateCritic } from '../../../services/critic'

export const updateCritic = (id, data) => async (dispatch) => {
  try {
    const response = await UpdateCritic(id, data)
    dispatch({type: 'UPDATE_CRITIC_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'UPDATE_CRITIC_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};