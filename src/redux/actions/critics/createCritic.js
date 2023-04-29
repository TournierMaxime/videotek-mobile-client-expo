import { CreateCritic } from '../../../services/critic'

export const createCritic = (data) => async (dispatch) => {
  try {
    const response = await CreateCritic(data)
    dispatch({type: 'CREATE_CRITIC_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'CREATE_CRITIC_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};