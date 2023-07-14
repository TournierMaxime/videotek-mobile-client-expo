import { DeleteFavorite } from '../../../services/favorites'

export const deleteFavorite = (favoriteId) => async (dispatch) => {
  try {
    const response = await DeleteFavorite(favoriteId)
    dispatch({type: 'DELETE_FAVORITE_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'DELETE_FAVORITE_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};