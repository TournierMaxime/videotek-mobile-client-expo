import { Update } from '../../../services/user'

export const updateUser = (data, userId) => async (dispatch) => {
  try {
    const response = await Update(data, userId)
    dispatch({type: 'UPDATE_USER_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'UPDATE_USER_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetUser = () => ({
  type: "USER_RESET",
});