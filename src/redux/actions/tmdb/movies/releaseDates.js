
import { ReleaseDates } from '../../../../services/tmdb'
  
export const releaseDates = (id) => async (dispatch) => {
  try {
    const response = await ReleaseDates(id)
    dispatch({type: 'RELEASE_DATES_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'RELEASE_DATES_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetReleaseDates = () => ({
  type: 'RESET_RELEASE_DATES',
})