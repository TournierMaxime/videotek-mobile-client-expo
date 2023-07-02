
import { MovieTrailer } from '../../../../services/tmdb'
  
export const movieTrailer = (id, language) => async (dispatch) => {
  try {
    const response = await MovieTrailer(id, language)
    dispatch({type: 'MOVIE_TRAILER_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'MOVIE_TRAILER_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};