import { GetOneFavorite } from '../../../services/favorites'

export const getOneFavorite = (userId, tmdbId) => async (dispatch) => {
  try {
    const response = await GetOneFavorite(userId, tmdbId)
    dispatch({type: 'GET_ONE_FAVORITE_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'GET_ONE_FAVORITE_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetFavorites = () => ({
  type: 'RESET_FAVORITES',
})