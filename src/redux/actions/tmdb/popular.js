
import { Popular } from '../../../services/tmdb'
  
export const popular = (page) => async (dispatch) => {
  try {
    const response = await Popular(page)
    dispatch({type: 'POPULAR_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'POPULAR_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};