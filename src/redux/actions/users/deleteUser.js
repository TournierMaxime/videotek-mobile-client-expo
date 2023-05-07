import { Delete } from '../../../services/user'

export const deleteUser = (userId) => async (dispatch) => {
  try {
    const response = await Delete(userId)
    dispatch({type: 'DELETE_USER_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'DELETE_USER_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};