
import { MovieCrew } from '../../../../services/tmdb'
  
export const movieCrew = (id, language) => async (dispatch) => {
  try {
    const response = await MovieCrew(id, language)
    dispatch({type: 'MOVIE_CREW_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'MOVIE_CREW_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetMovieCrew = () => ({
  type: 'RESET_MOVIE_CREW',
})