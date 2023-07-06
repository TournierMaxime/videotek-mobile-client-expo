
import { Popular } from '../../../../services/tmdb'
  
export const popular = (page, target = 'popular', language) => async (dispatch) => {
  try {
    const response = await Popular(page, language)
    dispatch({type: 'POPULAR_SUCCESS', payload: response.data, target});
    return response.data
  } catch (error) {
    dispatch({type: 'POPULAR_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetPopular = () => ({
  type: 'RESET_POPULAR',
})