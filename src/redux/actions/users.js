import { GetOneUser, UpdateUser, DeleteUser } from '../../services/users'

const getUser = (userId) => async (dispatch) => {
  try {
    const response = await GetOneUser(userId)
    dispatch({type: 'GET_USER_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'GET_USER_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const updateUser = (data, userId) => async (dispatch) => {
  try {
    const response = await UpdateUser(data, userId)
    dispatch({type: 'UPDATE_USER_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'UPDATE_USER_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const deleteUser = (userId) => async (dispatch) => {
  try {
    const response = await DeleteUser(userId)
    dispatch({type: 'DELETE_USER_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'DELETE_USER_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const resetUser = () => ({
  type: "USER_RESET",
});

export { getUser, updateUser, deleteUser, resetUser }