
import { Upcoming } from '../../../../services/tmdb'
  
export const upcoming = (page, target = 'upcoming', language) => async (dispatch) => {
  try {
    dispatch({ type: 'UPCOMING_REQUEST', target });
    const response = await Upcoming(page, language)
    dispatch({type: 'UPCOMING_SUCCESS', payload: response.data, target});
    return response.data
  } catch (error) {
    dispatch({type: 'UPCOMING_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetUpcoming = () => ({
  type: 'RESET_UPCOMING',
})