import { CreateFavorite } from '../../../services/favorites'

export const createFavorite = (data) => async (dispatch) => {
  try {
    const response = await CreateFavorite(data)
    dispatch({type: 'CREATE_FAVORITE_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'CREATE_FAVORITE_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};