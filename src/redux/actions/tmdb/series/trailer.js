
import { SerieTrailer } from '../../../../services/tmdb'
  
export const serieTrailer = (id, language) => async (dispatch) => {
  try {
    const response = await SerieTrailer(id, language)
    dispatch({type: 'SERIE_TRAILER_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SERIE_TRAILER_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};