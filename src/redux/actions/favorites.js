import { SearchFavorites, CreateFavorite, GetOneFavorite, DeleteFavorite } from '../../services/favorites'

const searchFavorite = (userId, filters) => async (dispatch) => {
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

const createFavorite = (data) => async (dispatch) => {
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

const getOneFavorite = (userId, tmdbId) => async (dispatch) => {
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

const deleteFavorite = (favoriteId) => async (dispatch) => {
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

const resetFavorites = () => ({
  type: 'RESET_FAVORITES',
})

export { searchFavorite, createFavorite, getOneFavorite, deleteFavorite, resetFavorites }