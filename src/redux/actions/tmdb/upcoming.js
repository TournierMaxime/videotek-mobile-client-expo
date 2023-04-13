
import { Upcoming } from '../../../services/tmdb'
  
export const upcoming = (page) => async (dispatch) => {
  try {
    const response = await Upcoming(page)
    dispatch({type: 'UPCOMING_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'UPCOMING_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};