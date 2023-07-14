import { SearchFavorites } from '../../../services/favorites'

export const searchFavorite = (userId, filters) => async (dispatch) => {
  try {
    const response = await SearchFavorites(userId, filters)
    dispatch({type: 'SEARCH_FAVORITE_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SEARCH_FAVORITE_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetFavorites = () => ({
  type: 'RESET_FAVORITES',
})