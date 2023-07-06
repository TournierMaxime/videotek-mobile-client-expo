
import { OnTheAir } from '../../../../services/tmdb'
  
export const onTheAir = (page, target = 'onTheAir', language) => async (dispatch) => {
  try {
    const response = await OnTheAir(page, language)
    dispatch({type: 'ON_THE_AIR_SUCCESS', payload: response.data, target});
    return response.data
  } catch (error) {
    dispatch({type: 'ON_THE_AIR_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetOnTheAir = () => ({
  type: 'RESET_ON_THE_AIR',
})