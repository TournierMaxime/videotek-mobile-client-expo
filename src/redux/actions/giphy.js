import { SearchGifs, GetOneGif, SearchCategory } from '../../services/giphy'

const searchCategory = (filters) => async (dispatch) => {
  try {
    const response = await SearchCategory(filters)
    dispatch({type: 'SEARCH_CATEGORY_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SEARCH_CATEGORY_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const searchGifs = (filters) => async (dispatch) => {
  try {
    const response = await SearchGifs(filters)
    dispatch({type: 'SEARCH_GIF_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SEARCH_GIF_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const getOneGif = (userId, tmdbId) => async (dispatch) => {
  try {
    const response = await GetOneGif(userId, tmdbId)
    dispatch({type: 'GET_ONE_GIF_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'GET_ONE_GIF_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const resetGif = () => ({
  type: 'RESET_GIF',
})

const resetCategory = () => ({
  type: 'RESET_CATEGORY',
})

export { searchGifs, getOneGif, resetGif, searchCategory, resetCategory }