import { GetUser } from '../../../services/user'

export const getUser = (userId) => async (dispatch) => {
  try {
    const response = await GetUser(userId)
    dispatch({type: 'GET_USER_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'GET_USER_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};