
import { Trending } from '../../../../services/tmdb'
  
export const trending = (page, target = 'trending') => async (dispatch) => {
  try {
    dispatch({ type: 'TRENDING_REQUEST', target });
    const response = await Trending(page)
    dispatch({type: 'TRENDING_SUCCESS', payload: response.data, target});
    return response.data
  } catch (error) {
    dispatch({type: 'TRENDING_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};