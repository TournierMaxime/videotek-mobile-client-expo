
import { Search } from '../../../services/tmdb'
  
export const search = (page, query) => async (dispatch) => {
  try {
    const response = await Search(page, query)
    dispatch({type: 'SEARCH_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SEARCH_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};