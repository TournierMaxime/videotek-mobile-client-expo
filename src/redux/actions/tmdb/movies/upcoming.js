
import { Upcoming } from '../../../../services/tmdb'
  
export const upcoming = (page, target = 'upcoming') => async (dispatch) => {
  try {
    dispatch({ type: 'UPCOMING_REQUEST', target });
    const response = await Upcoming(page)
    dispatch({type: 'UPCOMING_SUCCESS', payload: response.data, target});
    return response.data
  } catch (error) {
    dispatch({type: 'UPCOMING_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};