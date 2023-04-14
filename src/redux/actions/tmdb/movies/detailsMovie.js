
import { MovieDetails } from '../../../../services/tmdb'
  
export const movieDetails = (id) => async (dispatch) => {
  try {
    const response = await MovieDetails(id)
    dispatch({type: 'MOVIE_DETAILS_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'MOVIE_DETAILS_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};