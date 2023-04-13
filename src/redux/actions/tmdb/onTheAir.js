
import { OnTheAir } from '../../../services/tmdb'
  
export const onTheAir = (page) => async (dispatch) => {
  try {
    const response = await OnTheAir(page)
    dispatch({type: 'ON_THE_AIR_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'ON_THE_AIR_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};