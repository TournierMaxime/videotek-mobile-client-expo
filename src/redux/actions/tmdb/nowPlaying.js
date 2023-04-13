
  import { NowPlaying } from '../../../services/tmdb'
  
  export const nowPlaying = (page) => async (dispatch) => {
    try {
      const response = await NowPlaying(page)
      dispatch({type: 'NOW_PLAYING_SUCCESS', payload: response.data});
      return response.data
    } catch (error) {
      dispatch({type: 'NOW_PLAYING_FAILURE', payload: error.message});
      console.log(error)
      throw error
    }
  };